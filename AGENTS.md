Recora (Riverside.fm clone) Project Overview
Riverside.fm is a browser-based studio for podcasting, video interviews, live streams and webinars. Its key selling point is local high‑quality recording: each participant’s audio and video are captured on their own device (up to 4K video, uncompressed audio) and only then uploaded, so poor internet doesn’t degrade the recording
. The platform then provides multi-track editing (with a text-based transcript), branding tools (logos/overlays), AI enhancements (noise removal, filler-word cleanup, speaker framing), and distribution (live streaming, podcast hosting, auto show notes, transcripts, etc). Our goal is to “clone” these features in a free, self‑hosted system.

Below we detail Riverside’s user‑visible features (with citations), lesser‑known features under the hood, competing products (including open‑source options), architecture patterns for local recording, and finally cost‐saving / free components and a roadmap with trade‑offs.

Key Riverside.fm Features
Studio‑quality local recording: Riverside records locally on each guest’s machine, capturing up to 4K video and uncompressed 48kHz WAV audio for every participant
. This means recordings are unaffected by internet fluctuations. The platform automatically uploads each chunk of the recording to the cloud as you record (“progressive upload”) so nothing is lost
. After recording, you can download separate audio and video tracks per person
 (or a combined mix).

Multi‑track editing: Once recorded, sessions open in a web editor that shows the transcript of every speaker. You can cut/copy/paste directly in the text, and Riverside will splice the media for you
. Because tracks are separated, you can mute one person, remove crosstalk, or switch layouts easily
. The editor also lets you add logos, colors, intros/outros, and generates animated captions for social clips
. (In short: editing is like editing a document, not a timeline.)

AI‑powered enhancements: Riverside includes several AI “wizard” tools. For example, an audio clean‑up feature “polishes your sound, removes noise, and makes any mic sound professional”
. There are one-click tools to remove filler words or long silences (the “magic silence” tool)
. It can fix eye contact (by subtly zooming/cropping video when you look away) and even generate B-roll video clips from text prompts
. It offers auto-translation and dubbing into 30+ languages
. And it creates “Magic Clips” – short social videos and thumbnails pulled from your content – plus automated show notes, titles, descriptions and chapters
.

Live streaming & Webinars: Riverside isn’t just for recording; it can simulcast your session live to social platforms. You can go live in full HD to LinkedIn, YouTube, Instagram, Twitch, and others all at once
. During live events, hosts can manage audience Q&A and call‑ins, run polls, and moderate live chat—all within the same dashboard
. It supports webinar features like registration pages with email reminders and HubSpot integration for leads
. Every webinar is also recorded in high quality so you can later repurpose it into clips or a podcast
.

Built‑in podcast hosting & analytics: After you finish editing, Riverside can publish your podcast directly. It auto-generates podcast feeds and metadata so your episode can appear on Spotify, Apple Podcasts, YouTube, and all major directories with just a few clicks
. The platform provides basic podcast analytics (downloads, listener trends, episode success) to help you grow your show
. All of this is integrated: transcripts, descriptions, chapter markers and show notes can be auto-created or edited in one place
.

Mobile support: Riverside offers iOS/Android apps so guests can join from their phones and still record in HD
.

Together, these features make Riverside an “all-in-one studio”
 for creators. In our Recora project, we would aim to replicate each of these capabilities.

Lesser-Known / Backend Features
Beyond the above user-facing features, Riverside has some additional capabilities and behind-the-scenes mechanisms worth noting:

Async recording: Guests can record their part off-line and upload later. For example, if a guest can’t join live, they record themselves separately (on the Riverside site/app) and it automatically syncs with the main session
. This “record on your own time” feature is rare in live‑recording tools.

Teleprompter & Presenter tools: The host/producer can load a script into an on-screen teleprompter, so speakers stay on track
. Producers can also upload presentation slides; Riverside will record the slides locally in sync with the video
.

Producer Mode & Media Board: Riverside lets one person join as a producer, separate from on-camera hosts. The producer can manage technical details: adjust audio levels, hide/show guests, add lower-third titles, and play pre-recorded clips (via the “Media Board”) into the live studio
. (For example, a producer could drop in a jingle or video ad mid-show.)

Audience/Backstage Mode: In webinars, you can admit up to 1,000 viewers (Riverside mentions “1000 audience members”
). Riverside supports an “audience” or “backstage” mode: people in this mode can chat and call in, but are not on camera until promoted. (A similar concept appears in SquadCast’s Backstage feature for people waiting to go on-air
.)

Progressive cloud upload: As noted, each local recording is automatically chunk‑uploaded to Riverside’s cloud during the session
. That means even if someone’s computer crashes, the already-recorded parts are safe. Implementing this ourselves means breaking the MediaRecorder output into small blobs and sending them via HTTPS or WebSocket to the server as we go.

Security & Compliance: Riverside is SOC 2 certified
. If Recora needs security guarantees, we may also aim for end‑to‑end encryption of streams, secure storage, and user auth.

Competitors and Alternatives
Several other platforms and tools cover similar ground. Surveying them helps inspire feature ideas and potential shortcuts:

Zencastr – A browser podcast recorder. Like Riverside, it uses local recording. It offers separate tracks for each guest (audio and video), up to 11 participants (10 guests + host)
, and records up to 4K video. It guarantees “distortion-free” audio by recording high-bitrate (16‑bit 48kHz) WAVs
. It has a free tier and is easy to use via a join link. (However, it lacks Riverside’s advanced editing or live-streaming features.)

SquadCast – A cloud recording studio popular with podcasters. It also records each user locally on the browser with separate tracks, then auto‑uploads them
. SquadCast’s FAQ confirms it supports up to 10 total people (1 host + 9 guests)
. It focuses on reliability: video is optional, audio is always 48kHz WAV, and sessions auto-save to cloud storage. SquadCast adds features like a “green room” for testing, team roles/permissions, and a “backstage” area for waiting participants
.

StreamYard – A browser-based live streaming studio. StreamYard emphasizes ease of use: guests join by link or even from a mobile device, and up to 6 people can be on camera. It shines at multistreaming: going live to Facebook, YouTube, LinkedIn, Twitter, Twitch, etc. simultaneously
. It also produces local recordings in the browser with separate audio/video files (so it, too, does local recording for quality). StreamYard includes branding tools (custom overlays, intro/outro videos, logos)
 and supports on-screen comments. It’s simpler than Riverside, focusing on live production; it does not auto-edit or host podcasts itself.

Podcastle / Castbox / Others – These tools combine some recording and hosting features. Podcastle, for example, offers browser recording and AI transcription. However, many are limited to audio or are phone-only.

OBS Studio – Open Broadcaster Software is a free desktop app for high-quality recording and streaming. It isn’t a multi-user platform, but as an open-source tool it’s often mentioned. OBS can record local sources (screen, mic, webcam) and stream to services via RTMP. Riverside’s blog even lists OBS as an example of local recording software
. For Recora, OBS itself isn’t a competitor (since it’s desktop-based), but the architecture idea (record locally, stream/record) is relevant.

Open-source WebRTC frameworks: For building Recora’s backend, tools like OpenVidu (commercial/open-source hybrid) or Janus/mediasoup SFUs can provide scalable WebRTC. OpenVidu (community edition) is an open-source WebRTC platform for video calls and recording
. Jitsi Meet is 100% open-source and can do conferencing (with Jibri it can record to a file or live-stream to YouTube). A relatively new project, plugNmeet, advertises AI features and scalability (built on modern WebRTC) – it’s fully open-source.

Podcast hosting platforms: On the hosting side, fully free solutions include Castopod
 – a self‑hosted podcast platform that supports RSS distribution, analytics, even micropayments. It’s open-source (AGPL) and lets you control your feed. Using Castopod (or software like Podcast Generator) could replace Riverside’s built-in host if we need a no-cost option.

Object storage and CDN: If we need to store large media files cheaply, open-source S3 alternatives like MinIO can be self‑hosted
. MinIO is a high-performance, S3-compatible object store under AGPLv3
. For free content delivery, a CDN like Cloudflare (free tier) can cache and serve video.

By studying these alternatives, we see that separate local tracks, easy guest access (no downloads), multi-destination streaming, and integrated editing are competitive advantages. We should at minimum match separate-track recording and multi‑stream, and consider linking to open platforms (e.g. allow streaming to any RTMP endpoint or to platforms via APIs).

Architecture Patterns (Local Recording & Uploads)
Riverside’s core innovation is its recording architecture. One write-up (by a WebRTC engineer) describes a typical pattern: send a low-latency stream over UDP for the live studio (no retransmission, so minimal delay) while simultaneously sending a high-quality stream over TCP to ensure no frames are lost
. In practice, we might simplify: each client’s browser uses the MediaRecorder API to capture local audio/video. In many designs:

P2P vs SFU: With few participants (2–3), you could do pure peer-to-peer, but that scales poorly. For 4–10 participants or 100+ viewers, an SFU (Selective Forwarding Unit) is needed. Tools like Janus or mediasoup relay all streams to each client. In our case, since we also do local recording, the SFU’s role is mostly to handle the live preview and streaming. For local recording, we may not rely on the SFU.

Local recording: Each client records itself (e.g. using two MediaRecorders: one for webcam + mic, one for screen share if any). As the session goes on, the browser generates chunks (blobs). We implement “progressive upload”: send each chunk to our server (via WebSocket or XHR) as soon as it’s ready. This matches Riverside’s description of uploading during recording
. On stop, ensure all chunks have arrived. The server (e.g. a Node.js backend) stitches the chunks together and stores the raw files.

Uploads and storage: For zero cost, we might let clients optionally upload recordings to a free tier (e.g. AWS S3 Free Tier or a self-hosted MinIO). Or we could store on our own disk. If the service scales, a cloud storage (S3 or MinIO) and CDN are smart.

Live streaming (simulcast): To let Recora “stream everywhere”, we can integrate RTMP. The browser can send a combined stream to an RTMP server (like Nginx+RTMP module or a service). Alternatively, our backend could receive individual tracks and use FFmpeg to mix and push to a given stream key. Tools like OBS do this in desktop apps, but in-browser RTMP is trickier. There exist JS libraries (or one can use WebRTC to ingest and then transcode with FFmpeg on server). In any case, enabling arbitrary RTMP destinations will allow multi-platform live.

Synchronization: After recording, the tracks from each participant must be synchronized in time. If we rely on the same “start recording” event, all browsers start at (approximately) the same time. We should also record timestamps or use syncing beacons. Riverside “automatically syncs tracks”
, likely using either timecodes or an initial sync handshake.

Backend tools: We will need a signalling server (for WebRTC), probably using WebSockets. If using a ready SFU (OpenVidu/Janus), that includes signaling. We may also need an STUN/TURN server (to traverse NATs). For free hosting, Coturn (open source) can act as a TURN server to avoid connection issues.

Editing backend: If we offer a web editor, transcripts can be generated via a speech-to-text library (e.g. OpenAI’s Whisper or a Hugging Face model). This is computation-heavy but could be done offline (or skip if out of scope). For simpler MVP, allow downloading the raw tracks and use external editors.

Scalability: Supporting hundreds or thousands of live viewers (as in a webinar) likely means having a separate live-broadcast architecture (e.g. stream to YouTube and embed it, rather than actually sending 1000 WebRTC streams). For Recora, we might primarily enable up to ~10 presenters and rely on social platforms for audience.

This architecture emphasizes open-source components (Node.js, coturn, Janus/mediasoup, FFmpeg, etc.) so we avoid licensing costs.

Cost-Saving Self-Hosted Components
Since Recora must be free to users (and likely low-cost to run), we should leverage as many free/open technologies as possible:

WebRTC and SFU: Use free/open SFUs like Janus or mediasoup, or even OpenVidu (CE)
. These let you run multi-party video with recording and are self-hostable (no per-minute fees). Coturn (free) for TURN.

Object Storage: For storing recordings, use an S3-compatible open source solution like MinIO
. MinIO can run on your server or a cloud VM, giving you scalable object storage at no extra cost beyond your server. If using cloud, the first ~5GB or some free tiers (AWS/GCP) might suffice for prototyping.

Podcast Hosting: Instead of paying for podcast hosting, Castopod
 is an open-source podcast publishing platform. It handles RSS feeds, directory submission, and even has analytics (IABv2) built-in. We could integrate Recora with Castopod: after recording/editing an episode, push it to Castopod (self-hosted) to distribute on Spotify/Apple/etc.

Server and CDN: Use a free-tier VPS (e.g. AWS/GCP/Azure free credits, Oracle Cloud always‑free, or even a low-cost DigitalOcean droplet). For static assets and videos, use Cloudflare’s free CDN.

Transcription/AI: Heavy AI (speech-to-text, translation) usually costs money. For a free solution, one could use open models like Whisper or DeepSpeech running on our own server/GPU (if available). This is optional; at minimum we could let users download and run their own transcripts. Text-based editing itself doesn’t require cloud AI; it’s just a UI feature.

Development Tools: Frameworks like React, Node.js, FFmpeg, and others are free. Leverage existing open libraries for WebRTC (e.g. Simple-Peer or PeerJS if building from scratch).

Avoid Proprietary APIs: For streaming, use generic RTMP (open standard). For scheduling emails (webinar reminders), we could use a free Mailgun/Twilio SendGrid trial. If integration with CRMs (like HubSpot) is needed, either skip or only integrate with their free APIs.

Web Server and Database: A simple Postgres or SQLite (open source) can manage user accounts, session info, and metadata. SQLite could even run serverless (files only) if the scale is tiny.

In short, Recora should be built on open protocols and self-hosted software, minimizing any per‑minute or per-use charges. All major features (WebRTC, media storage, RSS feeds) have free implementations available
.