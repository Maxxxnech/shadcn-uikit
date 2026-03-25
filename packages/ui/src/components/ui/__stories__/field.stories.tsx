import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field, FieldLabel, FieldDescription } from '../field'
import { Input } from '../input'

const meta = {
  title: 'UI/Field',
  component: Field,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-[320px]">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" placeholder="Enter your email" />
      <FieldDescription>We&apos;ll never share your email with anyone.</FieldDescription>
    </Field>
  ),
}
