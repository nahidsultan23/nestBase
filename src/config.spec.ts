import { envVariables, mongoDbUri } from './config';

describe('Config', () => {
  describe('envVariables - Required Values Validation', () => {
    describe('Product Section', () => {
      it('should have product section with companyName', () => {
        expect(envVariables.product).toBeDefined();
        expect(envVariables.product.companyName).toBeDefined();
      });

      it('should have companyName from environment variable (not empty)', () => {
        expect(envVariables.product.companyName).not.toBe('');
        expect(envVariables.product.companyName.length).toBeGreaterThan(0);
      });

      it('should have companyName as string', () => {
        expect(typeof envVariables.product.companyName).toBe('string');
      });
    });

    describe('Environment Section', () => {
      it('should have environment section with nodeEnv', () => {
        expect(envVariables.environment).toBeDefined();
        expect(envVariables.environment.nodeEnv).toBeDefined();
      });

      it('should have nodeEnv from environment variable (not empty)', () => {
        expect(envVariables.environment.nodeEnv).not.toBe('');
        expect(envVariables.environment.nodeEnv.length).toBeGreaterThan(0);
      });

      it('should have nodeEnv as string', () => {
        expect(typeof envVariables.environment.nodeEnv).toBe('string');
      });
    });

    describe('Server Section', () => {
      it('should have server section with port', () => {
        expect(envVariables.server).toBeDefined();
        expect(envVariables.server.port).toBeDefined();
      });

      it('should have port as string', () => {
        expect(typeof envVariables.server.port).toBe('string');
      });

      it('should have port from environment variable (not empty and not "0")', () => {
        expect(envVariables.server.port).not.toBe('');
        expect(envVariables.server.port).not.toBe('0');
        expect(envVariables.server.port.length).toBeGreaterThan(0);
      });

      it('should have port as valid number string', () => {
        const port = parseInt(envVariables.server.port, 10);
        expect(port).toBeGreaterThan(0);
        expect(port).toBeLessThanOrEqual(65535);
      });
    });

    describe('CORS Configuration Section', () => {
      it('should have cors section with allowedOrigins', () => {
        expect(envVariables.cors).toBeDefined();
        expect(envVariables.cors.allowedOrigins).toBeDefined();
      });

      it('should have allowedOrigins as array', () => {
        expect(Array.isArray(envVariables.cors.allowedOrigins)).toBe(true);
      });

      it('should trim whitespace from origins', () => {
        const origins = envVariables.cors.allowedOrigins;
        origins.forEach((origin) => {
          expect(origin).toBe(origin.trim());
        });
      });
    });

    describe('Application Section', () => {
      it('should have application section with appName and appVersion', () => {
        expect(envVariables.application).toBeDefined();
        expect(envVariables.application.appName).toBeDefined();
        expect(envVariables.application.appVersion).toBeDefined();
      });

      it('should have appName from environment variable (not empty)', () => {
        expect(envVariables.application.appName).not.toBe('');
        expect(envVariables.application.appName.length).toBeGreaterThan(0);
      });

      it('should have appName as string', () => {
        expect(typeof envVariables.application.appName).toBe('string');
      });

      it('should have appVersion from environment variable (not empty)', () => {
        expect(envVariables.application.appVersion).not.toBe('');
        expect(envVariables.application.appVersion.length).toBeGreaterThan(0);
      });

      it('should have appVersion as string', () => {
        expect(typeof envVariables.application.appVersion).toBe('string');
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

      it('should have mongoDbDatabase from environment variable (not empty)', () => {
        expect(envVariables.mongoDbConfiguration.mongoDbDatabase).not.toBe('');
        expect(
          envVariables.mongoDbConfiguration.mongoDbDatabase.length,
        ).toBeGreaterThan(0);
      });

      it('should have mongoDbDatabase as string', () => {
        expect(typeof envVariables.mongoDbConfiguration.mongoDbDatabase).toBe(
          'string',
        );
      });

      it('should have mongoDbUser from environment variable (not empty)', () => {
        expect(envVariables.mongoDbConfiguration.mongoDbUser).not.toBe('');
        expect(
          envVariables.mongoDbConfiguration.mongoDbUser.length,
        ).toBeGreaterThan(0);
      });

      it('should have mongoDbUser as string', () => {
        expect(typeof envVariables.mongoDbConfiguration.mongoDbUser).toBe(
          'string',
        );
      });

      it('should have mongoDbPassword from environment variable (not empty)', () => {
        expect(envVariables.mongoDbConfiguration.mongoDbPassword).not.toBe('');
        expect(
          envVariables.mongoDbConfiguration.mongoDbPassword.length,
        ).toBeGreaterThan(0);
      });

      it('should have mongoDbPassword as string', () => {
        expect(typeof envVariables.mongoDbConfiguration.mongoDbPassword).toBe(
          'string',
        );
      });

      it('should have mongoDbHost from environment variable (not empty)', () => {
        expect(envVariables.mongoDbConfiguration.mongoDbHost).not.toBe('');
        expect(
          envVariables.mongoDbConfiguration.mongoDbHost.length,
        ).toBeGreaterThan(0);
      });

      it('should have mongoDbHost as string', () => {
        expect(typeof envVariables.mongoDbConfiguration.mongoDbHost).toBe(
          'string',
        );
      });

      it('should have mongoDbCluster from environment variable (not empty)', () => {
        expect(envVariables.mongoDbConfiguration.mongoDbCluster).not.toBe('');
        expect(
          envVariables.mongoDbConfiguration.mongoDbCluster.length,
        ).toBeGreaterThan(0);
      });

      it('should have mongoDbCluster as string', () => {
        expect(typeof envVariables.mongoDbConfiguration.mongoDbCluster).toBe(
          'string',
        );
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
