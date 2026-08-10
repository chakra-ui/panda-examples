import {
  Button,
  Badge,
  Input,
  Textarea,
  Label,
  Skeleton,
  Separator,
  Avatar,
  AvatarFallback,
  Switch,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@chakra-ui/shadcn-panda'
import { css, cx } from '../styled-system/css'
import { container, sectionCard, sectionLabel, row } from '../lib/frame'

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className={sectionCard}>
      <p className={sectionLabel}>{label}</p>
      {children}
    </section>
  )
}

const grid = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
  gap: '5',
})

const stack = css({ display: 'flex', flexDirection: 'column', gap: '3' })

export function ShowcaseGallery() {
  return (
    <main
      className={css({
        position: 'relative',
        zIndex: '1',
        paddingBottom: '20',
      })}
    >
      <div className={cx(container, css({ display: 'flex', flexDirection: 'column', gap: '5' }))}>
        <Section label="Buttons · variant">
          <div className={row}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <Separator className={css({ marginBlock: '5' })} />
          <p className={sectionLabel}>Buttons · size</p>
          <div className={row}>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="star">
              <StarIcon />
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </Section>

        <div className={grid}>
          <Section label="Badges">
            <div className={row}>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Section>

          <Section label="Avatar · Separator · Skeleton">
            <div className={row}>
              <Avatar size="sm">
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>LP</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <Separator orientation="vertical" className={css({ height: '10' })} />
              <div className={css({ display: 'flex', flexDirection: 'column', gap: '2', flex: '1' })}>
                <Skeleton className={css({ height: '4', width: '70%' })} />
                <Skeleton className={css({ height: '4', width: '45%' })} />
              </div>
            </div>
          </Section>
        </div>

        <div className={grid}>
          <Section label="Form">
            <div className={stack}>
              <div className={stack}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" />
              </div>
              <div className={stack}>
                <Label htmlFor="note">Note</Label>
                <Textarea id="note" placeholder="Tell us what you're building…" />
              </div>
              <label className={css({ display: 'flex', alignItems: 'center', gap: '2.5', fontSize: 'sm' })}>
                <Switch defaultChecked /> Email me product updates
              </label>
              <label className={css({ display: 'flex', alignItems: 'center', gap: '2.5', fontSize: 'sm' })}>
                <Switch size="sm" /> Small switch
              </label>
            </div>
          </Section>

          <Section label="Alerts">
            <div className={stack}>
              <Alert>
                <StarIcon />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>This component ships from the design system.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>Your changes could not be saved.</AlertDescription>
              </Alert>
            </div>
          </Section>
        </div>

        <div className={grid}>
          <Section label="Card">
            <Card>
              <CardHeader>
                <CardTitle>Decide once</CardTitle>
                <CardDescription>Tokens, recipes, and components in one place.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={css({ fontSize: 'sm', color: 'muted.foreground' })}>
                  Every app in the monorepo consumes the same system through `designSystem`.
                </p>
              </CardContent>
              <CardFooter className={css({ gap: '3' })}>
                <Button size="sm">Get started</Button>
                <Button size="sm" variant="outline">
                  Docs
                </Button>
              </CardFooter>
            </Card>
          </Section>

          <Section label="Tabs">
            <Tabs defaultValue="tokens">
              <TabsList>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
              </TabsList>
              <TabsContent value="tokens">
                <p className={css({ fontSize: 'sm', color: 'frame.muted', paddingTop: '3' })}>
                  The raw decisions, named — colors, radii, spacing.
                </p>
              </TabsContent>
              <TabsContent value="recipes">
                <p className={css({ fontSize: 'sm', color: 'frame.muted', paddingTop: '3' })}>
                  The variants, written once, with types for free.
                </p>
              </TabsContent>
              <TabsContent value="components">
                <p className={css({ fontSize: 'sm', color: 'frame.muted', paddingTop: '3' })}>
                  Thin React wrappers over the generated recipes.
                </p>
              </TabsContent>
            </Tabs>
          </Section>
        </div>
      </div>
    </main>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5 21.4l1.4-6.8L1.3 9.9l6.9-.8L12 2z"
        strokeLinejoin="round"
      />
    </svg>
  )
}
