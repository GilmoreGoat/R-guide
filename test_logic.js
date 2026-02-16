const escapeHTML = (str) => {
    if (!str) return str;
    return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    })[m]);
};

const tests = [
    {
        name: "Basic script tag",
        input: "<script>alert(1)</script>",
        expected: "&lt;script&gt;alert(1)&lt;/script&gt;"
    },
    {
        name: "Attribute breakout",
        input: '" onerror="alert(1)',
        expected: "&quot; onerror=&quot;alert(1)"
    },
    {
        name: "Single quote and ampersand",
        input: "O'Reilly & Sons",
        expected: "O&#39;Reilly &amp; Sons"
    },
    {
        name: "Mixed tags and text",
        input: "Hello <world> & 'Paris'",
        expected: "Hello &lt;world&gt; &amp; &#39;Paris&#39;"
    }
];

let failures = 0;
tests.forEach(test => {
    const actual = escapeHTML(test.input);
    if (actual === test.expected) {
        console.log(`✅ PASS: ${test.name}`);
    } else {
        console.log(`❌ FAIL: ${test.name}`);
        console.log(`   Input:    ${test.input}`);
        console.log(`   Expected: ${test.expected}`);
        console.log(`   Actual:   ${actual}`);
        failures++;
    }
});

if (failures === 0) {
    console.log("\nAll tests passed! 🎉");
    process.exit(0);
} else {
    console.log(`\n${failures} test(s) failed.`);
    process.exit(1);
}
