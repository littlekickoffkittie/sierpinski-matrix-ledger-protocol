import * as blessed from 'blessed';
import { SierpinskiMiningProtocol } from '../core/sierpinskiMiningProtocol';

async function runMiningTui() {
  // Create a screen object.
  const screen = blessed.screen({
    smartCSR: true,
    title: 'SMLP Mining TUI',
  });

  // Create a box to display logs
  const logBox = blessed.log({
    top: 0,
    left: 0,
    width: '100%',
    height: '100%-1',
    label: 'Mining Logs',
    border: {
      type: 'line',
    },
    scrollbar: {
      ch: ' ',
      track: {
        bg: 'grey',
      },
      style: {
        inverse: true,
      },
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: '#f0f0f0',
      },
    },
    tags: true,
    keys: true,
    mouse: true,
    vi: true,
    alwaysScroll: true,
    scrollable: true,
  });

  screen.append(logBox);

  // Create a status bar
  const statusBar = blessed.box({
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    style: {
      fg: 'white',
      bg: 'blue',
    },
    content: 'Press "q" to quit',
  });

  screen.append(statusBar);

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function () {
    return process.exit(0);
  });

  screen.render();

  // Initialize mining protocol
  const smp = new SierpinskiMiningProtocol();

  // Mining loop
  let attempts = 0;
  const targetDifficulty = 2;
  const data = 'mining data';

  logBox.log('Starting mining proof...');

  while (true) {
    attempts++;
    const proofValid = smp.performMiningProof(data, targetDifficulty, attempts);

    logBox.log(`Attempt ${attempts}: proof valid: ${proofValid}`);

    if (proofValid) {
      logBox.log(`{green-fg}Proof found after ${attempts} attempts{/green-fg}`);
      break;
    }

    // Render screen every 10 attempts to reduce flicker
    if (attempts % 10 === 0) {
      screen.render();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  statusBar.setContent(`Mining completed after ${attempts} attempts. Press "q" to quit.`);
  screen.render();
}

runMiningTui().catch((err) => {
  console.error('Error in mining TUI:', err);
  process.exit(1);
});
