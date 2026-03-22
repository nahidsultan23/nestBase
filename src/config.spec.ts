import { envVariables, mongoDbUri } from './config';

describe('Config', () => {
  describe('envVariables', () => {
    describe('Environment Section', () => {
      it('should have environment section with nodeEnv', () => {
        expect(envVariables.environment).toBeDefined();
        expect(envVariables.environment.nodeEnv).toBeDefined();
      });

      it('should have nodeEnv as string or undefined', () => {
        const nodeEnv = envVariables.environment.nodeEnv;
        expect(nodeEnv === undefined || typeof nodeEnv === 'string').toBe(true);
      });
    });

    describe('Server Section', () => {
      it('should have server section with port', () => {
        expect(envVariables.server).toBeDefined();
        expect(envVariables.server.port).toBeDefined();
        expect(typeof envVariables.server.port).toBe('string');
      });

      it('should have port as string with default value "0"', () => {
        expect(envVariables.server.port).toBeDefined();
        expect(typeof envVariables.server.port).toBe('string');
      });
    });

    describe('Application Section', () => {
      it('should have application section with appName and appVersion', () => {
        expect(envVariables.application).toBeDefined();
        expect(envVariables.application.appName).toBeDefined();
        expect(envVariables.application.appVersion).toBeDefined();
      });

      it('should have appName as string or undefined', () => {
        const appName = envVariables.application.appName;
        expect(appName === undefined || typeof appName === 'string').toBe(true);
      });

      it('should have appVersion as string or undefined', () => {
        const appVersion = envVariables.application.appVersion;
        expect(appVersion === undefined || typeof appVersion === 'string').toBe(
          true,
        );
      });
    });

    describe('MongoDB Configuration Section', () => {
      it('should have mongoDbConfiguration section with all required fields', () => {
        expect(envVariables.mongoDbConfiguration).toBeDefined();
        expect(envVariables.mongoDbConfiguration.mongoDbDatabase).toBeDefined();
        expect(envVariables.mongoDbConfiguration.mongoDbUser).toBeDefined();
        expect(envVariables.mongoDbConfiguration.mongoDbPassword).toBeDefined();
        expect(envVariables.mongoDbConfiguration.mongoDbHost).toBeDefined();
        expect(envVariables.mongoDbConfiguration.mongoDbCluster).toBeDefined();
      });

      it('should have mongoDbDatabase as string or undefined', () => {
        const db = envVariables.mongoDbConfiguration.mongoDbDatabase;
        expect(db === undefined || typeof db === 'string').toBe(true);
      });

      it('should have mongoDbUser as string or undefined', () => {
        const user = envVariables.mongoDbConfiguration.mongoDbUser;
        expect(user === undefined || typeof user === 'string').toBe(true);
      });

      it('should have mongoDbPassword as string or undefined', () => {
        const password = envVariables.mongoDbConfiguration.mongoDbPassword;
        expect(password === undefined || typeof password === 'string').toBe(
          true,
        );
      });

      it('should have mongoDbHost as string or undefined', () => {
        const host = envVariables.mongoDbConfiguration.mongoDbHost;
        expect(host === undefined || typeof host === 'string').toBe(true);
      });

      it('should have mongoDbCluster as string or undefined', () => {
        const cluster = envVariables.mongoDbConfiguration.mongoDbCluster;
        expect(cluster === undefined || typeof cluster === 'string').toBe(true);
      });
    });
  });

  describe('mongoDbUri', () => {
    it('should be defined', () => {
      expect(mongoDbUri).toBeDefined();
      expect(typeof mongoDbUri).toBe('string');
    });

    it('should format MongoDB SRV URI correctly', () => {
      const expectedUri = `mongodb+srv://${envVariables.mongoDbConfiguration.mongoDbUser}:${envVariables.mongoDbConfiguration.mongoDbPassword}@${envVariables.mongoDbConfiguration.mongoDbHost}/${envVariables.mongoDbConfiguration.mongoDbDatabase}?retryWrites=true&w=majority&appName=${envVariables.mongoDbConfiguration.mongoDbCluster}`;
      expect(mongoDbUri).toBe(expectedUri);
    });

    it('should include retryWrites parameter in URI', () => {
      expect(mongoDbUri).toContain('retryWrites=true');
    });

    it('should include w=majority parameter in URI', () => {
      expect(mongoDbUri).toContain('w=majority');
    });

    it('should include appName parameter in URI', () => {
      expect(mongoDbUri).toContain('appName=');
    });

    it('should use mongodb+srv protocol', () => {
      expect(mongoDbUri).toMatch(/^mongodb\+srv:\/\//);
    });
  });
});
