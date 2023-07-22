import 'reflect-metadata';
import { Ignitor } from '@adonisjs/core/build/standalone';
import * as sourceMapSupport from 'source-map-support';

sourceMapSupport.install({ handleUncaughtExceptions: false });

new Ignitor(__dirname).httpServer().start();
