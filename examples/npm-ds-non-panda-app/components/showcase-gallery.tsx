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

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="frame-card">
      <p className="frame-section-label">{label}</p>
      {children}
    </section>
  )
}

export function ShowcaseGallery() {
  return (
    <main className="frame-container frame-main">
      <Section label="Buttons · variant">
        <div className="frame-row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <Separator style={{ marginBlock: '1.25rem' }} />
        <p className="frame-section-label">Buttons · size</p>
        <div className="frame-row">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="star">
            <StarIcon />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <div className="frame-grid">
        <Section label="Badges">
          <div className="frame-row">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Section>

        <Section label="Avatar · Separator · Skeleton">
          <div className="frame-row">
            <Avatar>
              <AvatarFallback>LP</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" style={{ height: '2.5rem' }} />
            <div className="frame-stack" style={{ flex: 1 }}>
              <Skeleton style={{ height: '1rem', width: '70%' }} />
              <Skeleton style={{ height: '1rem', width: '45%' }} />
            </div>
          </div>
        </Section>
      </div>

      <div className="frame-grid">
        <Section label="Form">
          <div className="frame-stack">
            <div className="frame-stack">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" />
            </div>
            <div className="frame-stack">
              <Label htmlFor="note">Note</Label>
              <Textarea id="note" placeholder="Tell us what you're building…" />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', fontSize: '14px' }}>
              <Switch defaultChecked /> Email me product updates
            </label>
          </div>
        </Section>

        <Section label="Alerts">
          <div className="frame-stack">
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

      <div className="frame-grid">
        <Section label="Card">
          <Card>
            <CardHeader>
              <CardTitle>Decide once</CardTitle>
              <CardDescription>Tokens, recipes, and components in one place.</CardDescription>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '14px', color: 'var(--frame-muted)' }}>
                This app has no Panda installed. It imports one CSS file and the React components.
              </p>
            </CardContent>
            <CardFooter style={{ gap: '0.75rem' }}>
              <Button size="sm">Get started</Button>
              <Button size="sm" variant="outline">
                Docs
              </Button>
            </CardFooter>
          </Card>
        </Section>

        <Section label="Tabs">
          <Tabs defaultValue="css">
            <TabsList>
              <TabsTrigger value="css">One CSS file</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="zero">Zero config</TabsTrigger>
            </TabsList>
            <TabsContent value="css">
              <p style={{ fontSize: '14px', color: 'var(--frame-muted)', paddingTop: '0.75rem' }}>
                Import <code>@chakra-ui/shadcn-panda/styles.css</code> once.
              </p>
            </TabsContent>
            <TabsContent value="components">
              <p style={{ fontSize: '14px', color: 'var(--frame-muted)', paddingTop: '0.75rem' }}>
                Import the React components and render them.
              </p>
            </TabsContent>
            <TabsContent value="zero">
              <p style={{ fontSize: '14px', color: 'var(--frame-muted)', paddingTop: '0.75rem' }}>
                No <code>panda.config.ts</code>, no build step of your own.
              </p>
            </TabsContent>
          </Tabs>
        </Section>
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
