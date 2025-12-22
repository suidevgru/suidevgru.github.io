import React from 'react';
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

const ReactLiveScope = {
  React,
  ...React,
  Transaction,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
};

export default ReactLiveScope;
