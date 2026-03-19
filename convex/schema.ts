import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * C&F Bouw — Convex Schema
 *
 * aanvragen: Contact form submissions from cfbouw.nl
 * Each record represents a lead from the contact modal.
 */
export default defineSchema({
    aanvragen: defineTable({
        // Contact info
        naam:      v.string(),
        email:     v.string(),
        telefoon:  v.optional(v.string()),
        interesse: v.optional(v.string()),
        bericht:   v.optional(v.string()),

        // Lead management
        status: v.union(
            v.literal("nieuw"),
            v.literal("in_behandeling"),
            v.literal("afgerond"),
        ),

        // Meta
        ip:        v.string(),
        createdAt: v.number(), // Date.now()
    })
        .index("by_status",    ["status"])
        .index("by_createdAt", ["createdAt"]),
});
