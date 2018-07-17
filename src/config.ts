export interface CoursesList {
  [key: string]: Array<{ value: string; name: string; }>;
}

export const courses: CoursesList = {
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
