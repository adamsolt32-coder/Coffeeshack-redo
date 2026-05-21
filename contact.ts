import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("contact_submissions", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      message: args.message,
    });
    return null;
  },
});
