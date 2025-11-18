import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface {{pascalCase}}State {
  {{camelCase}}: any;
}

const initialState: {{pascalCase}}State = {
  {{camelCase}}: null,
};
export const {{camelCase}}Slice = createSlice({
  name: "{{camelCase}}",
  initialState,
  reducers: {
    set{{pascalCase}}(state, { payload }: PayloadAction<any>) {
      state.{{camelCase}} = payload;
    },
  },
});

export const { set{{pascalCase}} } = {{camelCase}}Slice.actions;
