import { Tx } from "../lucid/tx.ts";
import { Transaction, UTxO } from "../types/mod.ts";
import { Lucid } from "./lucid.ts";

/*
Similar to Tx, building up a list of constraints to be applied to a query.
Different, as instead of completing, you run the apply method.
This allows for a reusable set of constraints.

*/

type TxCallback = (tx: Tx) => void;

export class Constraints {
  private constraints: TxCallback[];
  // This is added since other libraries add it, but isn't yet necessary
  //private lucid: Lucid;

  constructor(lucid: Lucid) {
    //this.lucid = lucid;
    this.constraints = [];
  }

  public apply(tx: Tx) {
    // apply constraints to the transaction
    /*
        If api was immutable...
        var tx = tx;
        for (let constraint of this.constraints) {
            tx = tx.apply(constraint);
        }
        return tx;
    */
    for (let constraint of this.constraints) {
      tx.apply(constraint);
    }
    return tx;
  }

  public combine(other: Constraints) {
    // combine constraints
    this.constraints = this.constraints.concat(other.constraints);
    return this;
  }

  public add(constraint: TxCallback) {
    this.constraints.push(constraint);
    return this;
  }

  public mustSpendPubKeyOutput(oref: UTxO) {
    return this.add((tx) => tx.collectFrom([oref]));
  }
}

/*

Example usage

Constraints()
    .mustSpendPubKeyOutput(oref)
    .apply(tx);

*/