// Loaded once per application. Required for dependency injection
import 'reflect-metadata';
import { Container } from "inversify-props";

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
});

export { container };
