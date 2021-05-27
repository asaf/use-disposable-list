export const argsDefs = {
  args: {
    timeout: 3000,
    hideDuration: 0,
  },
  argTypes: {
    timeout: {
      type: "number",
      description: "the time (ms) before item is disposed",
    },
    hideDuration: {
      type: "number",
      description:
        "the time (ms) to postpone element hide, once close is clicked. required by animation.",
    },
  },
};
