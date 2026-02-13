import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'achievement',
  title: 'Achievements',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Achievement Title',
      type: 'string',
      description: 'e.g. 1st Place in RoboWars',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'event',
      title: 'Event/Competition Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Award/Team Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members Involved',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'gallery',
      title: 'Achievement Gallery',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'button1',
      title: 'Button 1',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'url', type: 'url', title: 'URL' },
      ],
    }),
    defineField({
      name: 'button2',
      title: 'Button 2',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'url', type: 'url', title: 'URL' },
      ],
    }),
  ],
})