import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'

const meta = {
  title: 'UI/Tabs',
  component: Tabs.Root,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Change your password here.</p>
      </TabsContent>
    </Tabs.Root>
  ),
}

export const ThreeTabs: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="analytics">Analytics content</TabsContent>
      <TabsContent value="reports">Reports content</TabsContent>
    </Tabs.Root>
  ),
}