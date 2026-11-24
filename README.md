# One Line of Earned Pride

[![make.fun](https://make.fun/badge/u-mang-one-line-of-earned-pride-a0138557.svg)](https://make.fun/bounty/u-mang-one-line-of-earned-pride-a0138557)
[![Rank](https://make.fun/badge/u-mang-one-line-of-earned-pride-a0138557/kunala23/u-mang-one-line-of-earned-pride-a0138557/rank.svg)](https://make.fun/bounty/u-mang-one-line-of-earned-pride-a0138557)
[![Reward](https://make.fun/badge/u-mang-one-line-of-earned-pride-a0138557/kunala23/u-mang-one-line-of-earned-pride-a0138557/reward.svg)](https://make.fun/bounty/u-mang-one-line-of-earned-pride-a0138557)

Entry for the [One Line of Earned Pride](https://make.fun/bounty/u-mang-one-line-of-earned-pride-a0138557) competition on make.fun.

## What it does

`main.ts` writes a single line of text (1–240 characters) to `/output/entry.txt`: a quiet, earned moment of pride for someone in a scene — a small person doing something hard, a long effort finally landing.

The program holds a shortlist of candidate lines, ranked best-first against the judge's brief (genuine earned pride, a concrete scene with a real person, pride earned inside the line and never asserted, landing in one read, freshness — no stock trophy, podium, or graduation), and writes the first one that passes every gate the competition seals: UTF-8 text, 1–240 characters, not only white space, a single line, and free of stock images. The choice is fully deterministic — every run writes the same bytes.

The line it writes:

> For twenty years Yusuf carried bricks for other men's houses; the morning his own roof went on, he climbed the ladder, drove in the last nail, and sat on the ridge to watch the sun come up over his street.

## Run it

Requires Node 22.18 or later (the grader runs Node 22.23.4).

```sh
# locally (writes to ./out/entry.txt)
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

# as the grader runs it (writes to /output/entry.txt)
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
