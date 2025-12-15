import { defineType } from "sanity";

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    { name: "username", title: "Username", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "passwordHash", title: "Password Hash", type: "string" },
    {
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "User", value: "user" },
          { title: "Admin", value: "admin" },
        ],
        layout: "radio",
      },
      initialValue: "user",
    },
  ],
});
