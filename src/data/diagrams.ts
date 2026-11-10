// Mermaid sources for the project diagrams. Each one is a function of the
// current theme colors (read from the @theme tokens at render time), so the
// same flowchart comes out pale in light mode and navy in dark mode.

export interface Palette {
  bg: string;
  surface: string;
  surface2: string;
  line: string;
  lineStrong: string;
  fg: string;
  fg2: string;
  accent: string;
  accentInk: string;
  ink: string;
}

const classes = (c: Palette) => `
    classDef step fill:${c.surface},stroke:${c.lineStrong},stroke-width:1.5px,color:${c.fg}
    classDef choice fill:${c.surface2},stroke:${c.ink},stroke-width:1.5px,color:${c.fg}
    classDef start fill:${c.fg},stroke:${c.fg},color:${c.bg}
    classDef done fill:${c.surface},stroke:${c.accent},stroke-width:2.5px,color:${c.fg}
    classDef fail fill:${c.bg},stroke:${c.accentInk},stroke-width:1.5px,stroke-dasharray:5 4,color:${c.accentInk}`;

const swiper = (c: Palette) => `flowchart TD
    S(["Menu bar app starts"]):::start --> P{{"Accessibility<br/>permission on?"}}:::choice
    P -- no --> PM["Menu shows Open System Settings<br/>clicks pass through untouched"]:::fail
    P -- yes --> T["Event tap watches<br/>the mouse buttons"]:::step
    T --> L(["Left button goes down"]):::start
    L --> H["Hold the click back<br/>for 30 to 50 ms"]:::step
    H --> R{{"Right button down<br/>inside that window?"}}:::choice
    R -- no --> CL["Replay the click<br/>everything works as normal"]:::fail
    R -- yes --> CH["Chord begins<br/>cursor is frozen"]:::step
    CH --> AX{{"Which way does<br/>the mouse move?"}}:::choice
    AX -- sideways --> SW["Post Dock swipe events<br/>desktops follow the hand<br/>direction follows natural scrolling"]:::step
    AX -- up --> MC["Open Mission Control"]:::step
    SW --> RE(["Release a button<br/>macOS settles on a desktop"]):::done
    MC --> RE
    T -.-> HC{{"Health check:<br/>did the gesture land?"}}:::choice
    HC -- no --> HF["Menu shows Gesture not working<br/>clicks keep working"]:::fail
${classes(c)}`;

const lineArrival = (c: Palette) => `flowchart TD
    A(["Phone joins<br/>a Wi-Fi network"]):::start --> B["iOS Shortcut sends POST<br/>/arrived-home or /arrived-uni"]:::step
    B --> C{{"X-Secret<br/>header valid?"}}:::choice
    C -- no --> C1["401 Unauthorized"]:::fail
    C -- yes --> D{{"Last trigger over<br/>30 min ago?"}}:::choice
    D -- no --> D1["429 with minutes left"]:::fail
    D -- yes --> E["Save trigger time<br/>read active recipients"]:::step
    E --> F["Push the text via LINE<br/>Messaging API, one per recipient"]:::step
    F --> G{{"Push<br/>succeeded?"}}:::choice
    G -- yes --> H["Insert a row<br/>in message_log"]:::step
    G -- no --> I["Add to failed list"]:::fail
    H --> J(["Return JSON<br/>sent, failed"]):::done
    I --> J
${classes(c)}`;

const lineWebhook = (c: Palette) => `flowchart LR
    A(["LINE sends an event<br/>follow, unfollow, join, leave"]):::start --> B{{"X-Line-Signature<br/>HMAC-SHA256 valid?"}}:::choice
    B -- no --> B1["401 Unauthorized"]:::fail
    B -- yes --> C{{"Event type?"}}:::choice
    C -- "follow, join" --> D["Upsert recipient<br/>active = true"]:::step
    C -- "unfollow, leave" --> E["Set recipient<br/>active = false"]:::step
    D --> F(["200 OK"]):::done
    E --> F
${classes(c)}`;

export const diagrams = { swiper, lineArrival, lineWebhook };
export type DiagramId = keyof typeof diagrams;
