import pathlib
src = pathlib.Path('src')
html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>HomeBridge · AI post-discharge recovery hub</title>
<meta name="description" content="Concept prototype for Tata 1mg: upload every hospital paper, get one reconciled recovery plan.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
{(src/'styles.css').read_text()}
</style>
</head>
<body>
<div class="stage"><aside class="rail" id="rail"></aside><div class="device"><div class="app" id="app"></div></div></div>
<script>
{(src/'data.js').read_text()}
{(src/'logic.js').read_text()}
{(src/'ui.js').read_text()}
</script>
</body>
</html>
"""
pathlib.Path('index.html').write_text(html)
print(len(html))
