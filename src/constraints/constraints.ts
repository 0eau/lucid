import { Tx } from "../lucid/tx.ts";
import { Transaction, UTxO, Redeemer } from "../types/mod.ts";
import { Lucid } from "./lucid.ts";

/*
Turns out Tx could already do that stuff, so I'm just going to use that.

Some of the constraints can be directly applied to a tx, however
some have smart 'resolving' behaviour, this may force us to use
a TxConstraints structure, and apply the constraints in one 'apply'.

*/

export class Constraints extends Tx {
  public mustSpendPubKeyOutput(oref: UTxO) {
    super.apply((tx) => tx.collectFrom([oref]));
    return this;
  }
  public mustSpendScriptOutput(oref: UTxO, redeemer: Redeemer) {
    super.apply((tx) => tx.collectFrom([oref], redeemer));
    return this;
  }

  public mustPayToOtherScript(Address, Datum, Value) {
    super.apply((tx)=>tx.payToContract(Address, Datum, Value));
    return this;
  }

  public mustHashDatum(){

  }

  // This might be annoying :|
  public mustProduceAtLeast(){

  }
}

/*

Example usage

Constraints(lucid)
    .mustSpendPubKeyOutput(oref)
    .complete();

*/
