#!/bin/bash
# LFRDCA Technologies — batch image generation (Dyotanya editorial sketchbook style)
cd /home/z/my-project
mkdir -p public/images
LOG=scripts/imagegen.log
echo "=== image generation started $(date) ===" >> $LOG

STYLE="hand-drawn ink line illustration on warm off-white paper, thin black sketch lines, muted dusty blue and soft coral watercolor accents, risograph print texture, editorial sketchbook style, minimal, elegant, high quality"

gen() {
  local prompt="$1"; local out="$2"; local size="${3:-1024x1024}"
  if [ -s "public/images/$out" ]; then echo "SKIP $out" >> $LOG; return 0; fi
  for i in 1 2 3; do
    z-ai image -p "$prompt" -o "public/images/$out" -s "$size" >> $LOG 2>&1
    if [ -s "public/images/$out" ]; then echo "OK $out" >> $LOG; return 0; fi
    echo "RETRY($i) $out" >> $LOG; sleep 3
  done
  echo "FAIL $out" >> $LOG; return 1
}

# Founder + team portraits (circular crops on site)
gen "portrait of a confident young Indian male tech founder with glasses and short dark hair, shoulders-up, $STYLE" "founder.png" "864x1152"
gen "portrait of a distinguished Indian man in his 40s wearing a formal blazer, CEO executive, shoulders-up, $STYLE" "team-1.png" "864x1152"
gen "portrait of an Indian woman data scientist with a warm smile, shoulders-up, $STYLE" "team-2.png" "864x1152"
gen "portrait of a young Indian male CTO with beard and casual shirt, shoulders-up, $STYLE" "team-3.png" "864x1152"
gen "portrait of an Indian woman engineer with long hair, thoughtful expression, shoulders-up, $STYLE" "team-4.png" "864x1152"
gen "portrait of a senior Indian man with grey hair and glasses, head of analytics, shoulders-up, $STYLE" "team-5.png" "864x1152"
gen "portrait of a young Indian woman HR leader with bright smile, shoulders-up, $STYLE" "team-6.png" "864x1152"
gen "portrait of an Indian male devops engineer wearing a hoodie, shoulders-up, $STYLE" "team-7.png" "864x1152"
gen "portrait of an Indian male delivery manager with moustache, shoulders-up, $STYLE" "team-8.png" "864x1152"

# Culture / office life
gen "diverse team of engineers collaborating around a whiteboard with sticky notes, $STYLE" "culture-1.png" "1344x768"
gen "modern startup office interior with plants and warm light, people working at wooden desks, $STYLE" "culture-2.png" "1344x768"
gen "hackathon night scene, laptops and coffee cups, whiteboard with diagrams, $STYLE" "culture-3.png" "1344x768"
gen "workshop training session, mentor presenting data charts to a small group, $STYLE" "culture-4.png" "1344x768"
gen "team celebration high-five moment with confetti sketches, $STYLE" "culture-5.png" "1344x768"
gen "one-on-one mentoring conversation in a cozy office corner, $STYLE" "culture-6.png" "1344x768"

# Blog covers (abstract data/AI topics)
gen "abstract neural network diagram made of hand-drawn nodes and thin connecting lines, $STYLE" "blog-1.png" "1152x864"
gen "data pipeline flowing through sketchy pipes and funnels with tiny charts, $STYLE" "blog-2.png" "1152x864"
gen "cloud architecture drawn as sketchy clouds connected by dotted lines, $STYLE" "blog-3.png" "1152x864"
gen "hand-drawn analytics dashboard with bar charts, line graphs and gauges, $STYLE" "blog-4.png" "1152x864"
gen "robot head with gears and thought bubbles, playful AI sketch, $STYLE" "blog-5.png" "1152x864"
gen "shield and lock cybersecurity doodle with key icons, $STYLE" "blog-6.png" "1152x864"
gen "speech bubbles and alphabet letters floating, language model sketch, $STYLE" "blog-7.png" "1152x864"
gen "crystal ball with rising trend arrow, predictive analytics fortune sketch, $STYLE" "blog-8.png" "1152x864"
gen "gears and conveyor belt automation doodle with tiny robots, $STYLE" "blog-9.png" "1152x864"
gen "filing cabinets and folders with checkmarks, data governance sketch, $STYLE" "blog-10.png" "1152x864"

# Case studies
gen "retail store shelves with shopping cart and rising sales chart doodles, $STYLE" "case-1.png" "1152x864"
gen "doctor with stethoscope and medical heartbeat line and cross icons, $STYLE" "case-2.png" "1152x864"
gen "bank building with magnifying glass over credit card, fraud detection sketch, $STYLE" "case-3.png" "1152x864"
gen "factory machines with wrench and warning symbols, predictive maintenance sketch, $STYLE" "case-4.png" "1152x864"
gen "shopping bags with recommendation stars and user avatars, personalization sketch, $STYLE" "case-5.png" "1152x864"
gen "city skyline with connected sensors, wifi waves and traffic lights, smart city sketch, $STYLE" "case-6.png" "1152x864"

# Insights / whitepapers / events
gen "open book with floating mathematical formulas and brain doodle, research sketch, $STYLE" "insight-1.png" "1152x864"
gen "telescope looking at scatter plot stars, forecasting research sketch, $STYLE" "insight-2.png" "1152x864"
gen "stack of papers with pie chart and magnifying glass, whitepaper sketch, $STYLE" "insight-3.png" "1152x864"
gen "graduation cap over laptop with certificate ribbons, AI education sketch, $STYLE" "insight-4.png" "1152x864"
gen "conference stage with microphone and audience doodles, tech meetup sketch, $STYLE" "event-1.png" "1152x864"
gen "workshop table with laptops and hand-raised doodles, training event sketch, $STYLE" "event-2.png" "1152x864"
gen "booth with banner and handshake doodles, expo event sketch, $STYLE" "event-3.png" "1152x864"

# Section images
gen "scientist at lab bench with glowing brain in jar and flasks, AI laboratory sketch, $STYLE" "ai-lab.png" "1344x768"
gen "large hand-drawn bar chart and pie chart composition with percent symbols, data visualization sketch, $STYLE" "data-viz.png" "1344x768"
gen "wide panoramic office team photo scene with warm light, plants and big windows, $STYLE" "office-hero.png" "1440x720"
gen "hero banner with the letters LFRDCA formed by circuit lines and data streams, abstract technology monogram sketch, $STYLE" "og-cover.png" "1440x720"

echo "=== image generation finished $(date) ===" >> $LOG
