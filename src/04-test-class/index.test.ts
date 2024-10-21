// Uncomment the code below and write your tests
import {
  getBankAccount,
  TransferFailedError,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(10).getBalance()).toBe(10);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(10).withdraw(12)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(10);
    const acc2 = getBankAccount(10);
    expect(() => acc1.transfer(20, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(10);
    expect(() => acc.transfer(10, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(10);
    acc.deposit(20);
    expect(acc.getBalance()).toBe(30);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(10);
    acc.withdraw(5);
    expect(acc.getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const acc1 = getBankAccount(10);
    const acc2 = getBankAccount(20);
    acc1.transfer(5, acc2);
    expect(acc1.getBalance()).toBe(5);
    expect(acc2.getBalance()).toBe(25);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(10);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(50);
    const resolvedBalance = await acc.fetchBalance();
    expect(typeof resolvedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(10);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(50);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(10);
    jest.spyOn(acc, 'fetchBalance').mockResolvedValue(null);
    await expect(acc.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
