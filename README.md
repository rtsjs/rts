# rts

## Hacking RTS algorithms in node
##Getting Started

1. Clone this repo

1. Run `npm install`
1 Downgrade npm:  `npm install -g npm@3.3.4` . With 3.3.6 nodemon install fails.
1. Configure tsd and dependencies:
*   `npm install tsd -g`
*   `cd  src`
*   `tsd install`

1. To run use: `gulp serve-dev`
1. builds, runs express host, monitors `*.ts` and syncs the browser

## Test
## Updates
*   Priority queue available in browser
*   Priority queue in typescript and is surfaced with NG2
*   Fixed PriorityQueue NG2 binding
*   Added Express to serve static content. 
*   Refactored API
*   Added gulp/browsersync integration
*   Integrated TS on the backend