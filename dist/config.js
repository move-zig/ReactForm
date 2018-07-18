"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courses = {
    'Foundational Courses': [
        { value: 'mm', name: 'Master Makeup Artistry' },
        { value: 'ma', name: 'Makeup Artistry' },
    ],
    'Advanced & Specialty Courses': [
        { value: 'sf', name: 'Special FX Makeup' },
        { value: 'hs', name: 'Hair Styling Essentials' },
        { value: 'pf', name: 'Fashion Styling' },
        { value: 'ab', name: 'Airbrush Makeup Workshop' },
        { value: 'mw', name: 'Pro Makeup Workshop' },
        { value: 'pw', name: 'Portfolio Development Workshop' },
        { value: 'gb', name: 'Global Beauty Workshop' },
        { value: 'sk', name: 'Skincare' },
    ],
};
exports.exclusions = {
    MM: {
        message: 'This course can\'t be taken with Master Makeup Artistry',
        courses: ['MA'],
    },
    MA: {
        message: 'This course can\'t be taken with Makeup Artistry',
        courses: ['MM'],
    },
};
//# sourceMappingURL=config.js.map