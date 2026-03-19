import { v }        from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * createAanvraag — schrijft een contact-aanvraag naar de database.
 * Wordt aangeroepen vanuit de Astro /api/contact route (server-side).
 */
export const createAanvraag = mutation({
    args: {
        naam:      v.string(),
        email:     v.string(),
        telefoon:  v.optional(v.string()),
        interesse: v.optional(v.string()),
        bericht:   v.optional(v.string()),
        ip:        v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("aanvragen", {
            naam:      args.naam,
            email:     args.email,
            telefoon:  args.telefoon,
            interesse: args.interesse,
            bericht:   args.bericht,
            status:    "nieuw",
            ip:        args.ip,
            createdAt: Date.now(),
        });
    },
});

/**
 * listAanvragen — haalt alle aanvragen op, nieuwste eerst.
 * Klaar voor gebruik in een toekomstig admin panel.
 */
export const listAanvragen = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("aanvragen")
            .withIndex("by_createdAt")
            .order("desc")
            .collect();
    },
});

/**
 * updateStatus — zet de status van een aanvraag.
 */
export const updateStatus = mutation({
    args: {
        id:     v.id("aanvragen"),
        status: v.union(
            v.literal("nieuw"),
            v.literal("in_behandeling"),
            v.literal("afgerond"),
        ),
    },
    handler: async (ctx, { id, status }) => {
        await ctx.db.patch(id, { status });
    },
});
