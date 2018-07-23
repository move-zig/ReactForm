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
  'Event Courses': [
    { value: 'ep', name: 'Event & Wedding Planning' },
    { value: 'wp', name: 'Wedding Planning' },
    { value: 'cp', name: 'Corporate Event Planning' },
    { value: 'ce', name: 'Event Planning' },
    { value: 'lw', name: 'Luxury Wedding Planning' },
    { value: 'dw', name: 'Destination Wedding Planning' },
    { value: 'ed', name: 'Event Decor' },
  ],
  'Design Courses': [
    { value: 'i2', name: 'Interior Decorating' },
    { value: 'st', name: 'Home Staging and Redesign' },
    { value: 'mi', name: 'Core Interior Decorating' },
    { value: 'ms', name: 'Staging for Designers' },
    { value: 'fs', name: 'Feng Shui' },
    { value: 'po', name: 'Professional Organizing' },
  ],
};

export interface IExclusions {
  [key: string]: {
    message: string;
    courses: string[];
  };
}

export const mutualExclusionSets = [
  {
    courses: [ 'mm', 'ma' ],
    description: 'Makeup Artistry is included in Master Makeup Artistry',
  },
  {
    courses: [ 'i2', 'st', 'rd' ],
    description: 'Interior Decorating, Home Staging and Redesign, and Interior Redesign have overlapping material',
  },
  {
    courses: [ 'i2', 'mi' ],
    description: 'Core Interior Decorating is included in Interior Decorating',
  },
  {
    courses: [ 'st', 'ms' ],
    description: 'Staging for Designers is included in Home Staging',
  },
  {
    courses: [ 'ep', 'wp', 'ce' ],
    description: 'Event & Wedding Planning, Wedding Planning, and Event Planning have overlapping material',
  },
];
