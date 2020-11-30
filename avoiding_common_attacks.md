# AVOIDING COMMON ATTACKS

```
1. Avoided re-entrancy in transfering earned amount to the recipient by ensuring that the recipients account is zeroed out before initiating transfer to the recipients
```

```
2. Used transfer instead of send thereby avoiding issues arising from send not returning any response on an OOG (Out of Gas) revert.
```

```
3. Used withdrawal pattern, as opposed to transferring directly to the recipients account and losing funds without the recipients knowledge adhering to the principle of sending after an effect
```

```
4. Added a fallback function to ensure that contract method reverts don't lose their value.
```
