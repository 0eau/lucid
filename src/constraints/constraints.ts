import { Tx } from "../lucid/tx.ts";
import { Transaction, UTxO } from "../types/mod.ts";
import { Lucid } from "./lucid.ts";

/*
Turns out Tx could already do that stuff, so I'm just going to use that.

*/

export class Constraints extends Tx {
  public mustSpendPubKeyOutput(oref: UTxO) {
    super.apply((tx) => tx.collectFrom([oref]));
    return this;
  }
}

/*

Example usage

Constraints(lucid)
    .mustSpendPubKeyOutput(oref)
    .complete();

*/
