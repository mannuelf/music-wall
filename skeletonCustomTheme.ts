import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const skeletonCustomTheme: CustomThemeConfig = {
	name: 'skeletonCustomTheme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #F18F01
		'--color-primary-50': '253 238 217', // #fdeed9
		'--color-primary-100': '252 233 204', // #fce9cc
		'--color-primary-200': '252 227 192', // #fce3c0
		'--color-primary-300': '249 210 153', // #f9d299
		'--color-primary-400': '245 177 77', // #f5b14d
		'--color-primary-500': '241 143 1', // #F18F01
		'--color-primary-600': '217 129 1', // #d98101
		'--color-primary-700': '181 107 1', // #b56b01
		'--color-primary-800': '145 86 1', // #915601
		'--color-primary-900': '118 70 0', // #764600
		// secondary | #A23B72
		'--color-secondary-50': '241 226 234', // #f1e2ea
		'--color-secondary-100': '236 216 227', // #ecd8e3
		'--color-secondary-200': '232 206 220', // #e8cedc
		'--color-secondary-300': '218 177 199', // #dab1c7
		'--color-secondary-400': '190 118 156', // #be769c
		'--color-secondary-500': '162 59 114', // #A23B72
		'--color-secondary-600': '146 53 103', // #923567
		'--color-secondary-700': '122 44 86', // #7a2c56
		'--color-secondary-800': '97 35 68', // #612344
		'--color-secondary-900': '79 29 56', // #4f1d38
		// tertiary | #C73E1D
		'--color-tertiary-50': '247 226 221', // #f7e2dd
		'--color-tertiary-100': '244 216 210', // #f4d8d2
		'--color-tertiary-200': '241 207 199', // #f1cfc7
		'--color-tertiary-300': '233 178 165', // #e9b2a5
		'--color-tertiary-400': '216 120 97', // #d87861
		'--color-tertiary-500': '199 62 29', // #C73E1D
		'--color-tertiary-600': '179 56 26', // #b3381a
		'--color-tertiary-700': '149 47 22', // #952f16
		'--color-tertiary-800': '119 37 17', // #772511
		'--color-tertiary-900': '98 30 14', // #621e0e
		// success | #84cc16
		'--color-success-50': '237 247 220', // #edf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '206 235 162', // #ceeba2
		'--color-success-400': '169 219 92', // #a9db5c
		'--color-success-500': '132 204 22', // #84cc16
		'--color-success-600': '119 184 20', // #77b814
		'--color-success-700': '99 153 17', // #639911
		'--color-success-800': '79 122 13', // #4f7a0d
		'--color-success-900': '65 100 11', // #41640b
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #D41976
		'--color-error-50': '249 221 234', // #f9ddea
		'--color-error-100': '246 209 228', // #f6d1e4
		'--color-error-200': '244 198 221', // #f4c6dd
		'--color-error-300': '238 163 200', // #eea3c8
		'--color-error-400': '225 94 159', // #e15e9f
		'--color-error-500': '212 25 118', // #D41976
		'--color-error-600': '191 23 106', // #bf176a
		'--color-error-700': '159 19 89', // #9f1359
		'--color-error-800': '127 15 71', // #7f0f47
		'--color-error-900': '104 12 58', // #680c3a
		// surface | #495a8f
		'--color-surface-50': '228 230 238', // #e4e6ee
		'--color-surface-100': '219 222 233', // #dbdee9
		'--color-surface-200': '210 214 227', // #d2d6e3
		'--color-surface-300': '182 189 210', // #b6bdd2
		'--color-surface-400': '128 140 177', // #808cb1
		'--color-surface-500': '73 90 143', // #495a8f
		'--color-surface-600': '66 81 129', // #425181
		'--color-surface-700': '55 68 107', // #37446b
		'--color-surface-800': '44 54 86', // #2c3656
		'--color-surface-900': '36 44 70' // #242c46
	}
};
