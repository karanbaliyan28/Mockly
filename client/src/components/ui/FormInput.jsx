import React from "react";

const FormInput = ({ id, label, type, value, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required
      // This is the fix: If the value is undefined or null, it defaults to an empty string.
      value={value || ""}
      onChange={onChange}
      className="block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

export default FormInput;
