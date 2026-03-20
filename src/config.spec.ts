import { envVariables, mongoDbUri } from './config';

describe('Config', () => {
  describe('Environment Variables Structure', () => {
    it('should have environment section with nodeEnv', () => {
      expect(envVariables.environment).toBeDefined();
      expect(envVariables.environment.nodeEnv).toBeDefined();
    });

    it('should have server section with port', () => {
      expect(envVariables.server).toBeDefined();
      expect(envVariables.server.port).toBeDefined();
      expect(typeof envVariables.server.port).toBe('string');
    });

    it('should have application section with appName and appVersion', () => {
      expect(envVariables.application).toBeDefined();
      expect(envVariables.application.appName).toBeDefined();
      expect(envVariables.application.appVersion).toBeDefined();
    });

    it('should have mongoDbConfiguration section', () => {
      expect(envVariables.mongoDbConfiguration).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbDatabase).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbUser).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbPassword).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbHost).toBeDefined();
      expect(envVariables.mongoDbConfiguration.mongoDbCluster).toBeDefined();
    });
  });

  describe('MongoDB URI', () => {
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
