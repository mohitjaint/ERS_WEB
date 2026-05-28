import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Faculty In-Charge (FIC)', value: 'FIC' },
          { title: 'Coordinator', value: 'Coordinator' },
          { title: 'Co-Coordinator', value: 'Co-Coordinator' },
          { title: 'Member', value: 'Member' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'number',
      hidden: ({ document }) => document?.role === 'FIC',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const role = context.document?.role
          if (role === 'FIC') return true
          if (value === undefined || value === null) return 'Batch is required'
          if (!Number.isInteger(value)) return 'Batch must be a year'
          if (value < 1900 || value > 2100) return 'Batch must be a valid year'
          return true
        }),
    }),
    defineField({
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    }),
  ],
})