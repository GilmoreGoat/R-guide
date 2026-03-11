import glob
import re

files = glob.glob('*.html') + glob.glob('modules/*.html')
script_tag = """    <script>
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    </script>
"""

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Avoid adding it multiple times
    if 'localStorage.getItem(\'theme\')' in content:
        continue

    # Insert just before </head>
    new_content = re.sub(r'(</head>)', f"{script_tag}\\1", content)

    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Updated {file}")
