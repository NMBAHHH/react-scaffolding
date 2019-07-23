module.exports = {
    'extends': 'stylelint-config-standard',
    'rules': {
        'at-rule-no-unknown': [ true, {
            'ignoreAtRules': [
                'extends',
                'ignores'
            ]
        }],
        'indentation': 4,
        'number-leading-zero': null,
        'unit-whitelist': ['em', 'rem', 's', 'px', 'deg', 'all'],
        'no-eol-whitespace': [true, { 'ignore': 'empty-lines' }],
        'selector-list-comma-newline-after': 'never-multi-line',
        'declaration-block-trailing-semicolon': 'never'
    }
};