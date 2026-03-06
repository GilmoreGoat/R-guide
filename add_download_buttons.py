import os
import glob

# Mapping of module html filename to the zip file name
module_mapping = {
    'basics.html': 'module_1_basics',
    'wrangling.html': 'module_2_wrangling',
    'tidying.html': 'module_3_tidying',
    'visualization.html': 'module_4_visualization',
    'statistics.html': 'module_5_statistics',
    'anova.html': 'module_6_anova',
    'regression.html': 'module_7_regression',
    'categorical.html': 'module_8_categorical',
    'module6.html': 'skill_a_module6',
    'skill_b.html': 'skill_b_dates',
    'skill_c.html': 'skill_c_strings',
    'functional.html': 'skill_d_functional',
    'oop.html': 'skill_e_oop',
    'metaprogramming.html': 'skill_f_metaprogramming',
    'debugging.html': 'skill_g_debugging'
}

html_files = glob.glob('modules/*.html')

for filepath in html_files:
    filename = os.path.basename(filepath)
    if filename in module_mapping:
        zip_name = module_mapping[filename]

        with open(filepath, 'r') as f:
            content = f.read()

        if 'Download Challenge Project' not in content:
            # HTML snippet to insert before </body>
            snippet = f"""
<div class="concept-card border-coffee-dark text-center mt-60">
    <h2>🏆 End of Module Challenge</h2>
    <p>Ready to test your skills? Download the R Studio project below to practice everything you've learned in this module.</p>
    <a href="../downloads/{zip_name}.zip" class="start-btn" style="display: inline-block; margin-top: 15px;">Download Challenge Project &darr;</a>
</div>

"""
            # Insert snippet before </body>
            new_content = content.replace('</body>', snippet + '</body>')

            with open(filepath, 'w') as f:
                f.write(new_content)

print("Done modifying HTML files.")
