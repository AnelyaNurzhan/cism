
import { TestWithQuestionCount } from '@/hooks/useTests';
import { SpecializationTest } from '@/hooks/useSpecializationTests';
import { AdminTestService } from './test-access/AdminTestService';
import { UserTestService } from './test-access/UserTestService';
import { SpecializationTestService } from './test-access/SpecializationTestService';

export class TestService {
  static async getTestsWithAccess(userId: string, isAdmin: boolean): Promise<TestWithQuestionCount[]> {
    try {
      console.log('=== TestService.getTestsWithAccess DEBUG ===');
      console.log('Parameters:', { userId, isAdmin });
      
      let result;
      if (isAdmin) {
        console.log('Using AdminTestService...');
        result = await AdminTestService.getTestsWithAccess(userId);
      } else {
        console.log('Using UserTestService...');
        result = await UserTestService.getTestsWithAccess(userId);
      }
      
      console.log('TestService result:', result);
      console.log('Number of tests returned:', result.length);
      
      return result;
      
    } catch (error) {
      console.error('Error in TestService.getTestsWithAccess:', error);
      throw error;
    }
  }

  static async getSpecializationTests(
    specializationId: string, 
    levelId: string, 
    userId: string, 
    isAdmin: boolean
  ): Promise<SpecializationTest[]> {
    try {
      console.log('=== TestService.getSpecializationTests DEBUG ===');
      console.log('Parameters:', { specializationId, levelId, userId, isAdmin });
      
      const result = await SpecializationTestService.getSpecializationTests(specializationId, levelId, userId, isAdmin);
      
      console.log('SpecializationTestService result:', result);
      console.log('Number of specialization tests returned:', result.length);
      
      return result;
    } catch (error) {
      console.error('Error in TestService.getSpecializationTests:', error);
      throw error;
    }
  }
}
