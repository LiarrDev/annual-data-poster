#!/usr/bin/env python3
"""把 src/shell.html + src/app.js + china.json + h2c.js 打包成单文件 index.html"""
import json, base64, io, random, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')

shell = open(os.path.join(SRC, 'shell.html'), encoding='utf-8').read()
app = open(os.path.join(SRC, 'app.js'), encoding='utf-8').read()
lib = open(os.path.join(ROOT, 'h2c.js'), encoding='utf-8').read()
geo = json.load(open(os.path.join(ROOT, 'china.json'), encoding='utf-8'))

# --- 压缩边界数据：只保留 name / adcode / centroid，坐标保留 2 位小数（约 1km，海报尺度不可见） ---
def r2(v):
    return round(v, 2)

def round_geom(g):
    if g['type'] == 'Polygon':
        return {'type': 'Polygon', 'coordinates': [[[r2(x), r2(y)] for x, y in ring] for ring in g['coordinates']]}
    return {'type': 'MultiPolygon', 'coordinates': [[[[r2(x), r2(y)] for x, y in ring] for ring in poly] for poly in g['coordinates']]}

out = {'type': 'FeatureCollection', 'features': []}
for f in geo['features']:
    p = f['properties']
    g = f['geometry']
    if not g:
        continue
    out['features'].append({
        'type': 'Feature',
        'properties': {
            'adcode': p.get('adcode'),
            'name': p.get('name', ''),
            'centroid': p.get('centroid') or p.get('center'),
        },
        'geometry': round_geom(g),
    })

geo_js = json.dumps(out, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')

# --- 噪点纹理 ---
random.seed(7)
from PIL import Image
N = 96
img = Image.new('RGBA', (N, N), (0, 0, 0, 0))
px = img.load()
for y in range(N):
    for x in range(N):
        if random.random() < 0.35:
            px[x, y] = (250, 250, 252, random.randint(6, 40))
buf = io.BytesIO()
img.save(buf, 'PNG', optimize=True)
noise = 'url(data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode() + ')'

html = (shell
        .replace('__GEO__', geo_js)
        .replace('__LIB__', lib)
        .replace('__APP__', app)
        .replace('__NOISE__', noise))

left = re.findall(r'__[A-Z]+__', html)
assert not left, left

dest = os.path.join(ROOT, 'index.html')
open(dest, 'w', encoding='utf-8').write(html)
print('built', dest, round(len(html.encode()) / 1024), 'KB   geo:', round(len(geo_js.encode()) / 1024), 'KB')
