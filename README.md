# rts

## Hacking RTS algorithms in node
##Getting Started

1. Clone this repo

1. Run `npm install`
1 Downgrade npm:  `npm install -g npm@3.3.4` . With 3.3.6 nodemon install fails.
1. Configure tsd and dependencies:
1.      `npm install tsd -g`
1.      `cd  src`
1.      `tsd install`

1. To run use: `gulp serve-dev`
1. builds, runs express host, monitors `*.ts` and syncs the browser

## Test
## Updates
1. Priority queue available in browser
2. Priority queue in typescript and is surfaced with NG2
3. Fixed PriorityQueue NG2 binding
4. Added Express to serve static content. 
5. Refactored API
6. Added gulp/browsersync integration
7. Integrated TS on the backend