# DESIGN PATTERN DECISIONS

```
1. Withdrawal Pattern: Ensure that the recipient calls the withdraw method following the method of sending funds after an effect and avoiding common security loophole caused by directly sending money without the knowledge of the recipient
```

```
3. Circuit Breaker Design Pattern: This was used to pause contract execution in the case of a failure while still making it possible for withdrawals to be made, this allows the admin to control contract flow for more protection.
```

```
2. Upgradable Design Pattern:
```
