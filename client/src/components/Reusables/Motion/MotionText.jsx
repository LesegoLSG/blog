// Text variant from left side
export const leftToRightVariant = {
  hidden: { x: -100 },
  visible: { x: 0, transition: { duration: 2 } },
  exit: { x: 100, transition: { duration: 1 } },
};

// Text variant from right side
export const rightToLeftVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 2 } },
  exit: { opacity: 0, x: 100, transition: { duration: 1 } },
};
