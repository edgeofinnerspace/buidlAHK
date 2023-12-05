const EthTx = require('ethereumjs-tx');
var EthUtil = require('ethereumjs-util');
var Web3 = require('web3');

const defaultProvider = "https://mainnet.infura.io/v3/e59c464c322f47e2963f5f00638be2f8"

//Legacy function
/*
function Web3Transaction() {
  this.addInput("[blockchain]","string")
  this.addInput("[privatekey]","string")
  this.addInput("[to]","string")
  this.addInput("[value]","number,string")
  this.addInput("[data]","string")
  this.addInput("[gasLimit]","number,string")
  this.addInput("[gasPrice]","number,string")
  this.addInput("[nonce]","number,string")
  this.addInput("sign",-1)
  this.addOutput("transaction", "object");
  this.addOutput("signed", "string");
  this.addOutput("signed",-1)
  this.addOutput("hash","string")
  this.properties = { value: 0, nonce: null, data: "0x", gas: 23000, gasPrice: 4100000000, provider: defaultProvider, privateKey: ""  };
  this.size[0]=240
  this.signed = false
}
*/

//Updated function for EIP1559
//.|NewTX|---Start--->\\
function Web3Transaction() {
  this.addInput("[blockchain]", "string");
  this.addInput("[privatekey]", "string");
  this.addInput("[type]", "number, string");
  this.addInput("[chainId]", "number string");
  this.addInput("[to]", "string");
  this.addInput("[value]", "number, string");
  this.addInput("[data]", "string");
  this.addInput("[gasLimit]", "number, string");
  this.addInput("[maxPriorityFeePerGas]", "number, string");
  this.addInput("[maxFeePerGas]", "number, string");
  this.addInput("[accessList]", "array");
  this.addInput("[nonce]", "number, string");
  this.addInput("[strict]", "string");
  this.addInput("sign", -1);
  this.addOutput("transaction", "object");
  this.addOutput("signed", "string");
  this.addOutput("signed", -1);
  this.addOutput("hash", "string");
  this.properties = {
    to: "",
    value: 0,
    data: "0x",
    gasLimit: 23000,
    maxFeePerGas: 0,
    maxPriorityFeePerGas: 0,
    nonce: null,
    provider: defaultProvider,
    privateKey: ""
  };
  this.size[0] = 240;
  this.signed = false;
};
//<---End---|NewTX|.\\ 

Web3Transaction.title = "Transaction";

Web3Transaction.prototype.connectWeb3 = function() {
  if (this.properties.provider) {
    // console.log("CONNECTING TO", this.properties.provider);
    this.web3 = new Web3(this.properties.provider);
  }
};

Web3Transaction.prototype.setInput = function(index, name, type) {
  let optional = this.getInputData(index);
  if (typeof optional !== "undefined" && optional !== this.properties[name]) {
    this.onPropertyChanged(name, optional);
  }
};

Web3Transaction.prototype.assureHex = function(str) {
  if (str.indexOf("0x") < 0) {
    str = "0x" + str;
  }
  return str;
};

Web3Transaction.prototype.onExecute = function() {
  let optionalProvider = this.getInputData(0);
  if (typeof optionalProvider !== "undefined" && optionalProvider !== this.properties.provider) {
    this.onPropertyChanged("provider", optionalProvider);
  } else if (typeof optionalProvider === "undefined") {
    if (this.properties.provider !== defaultProvider) {
      // console.log("SET BACK TO DEFAULT!!!");
      this.onPropertyChanged("provider", defaultProvider);
    }
  }
};

let optionalPrivateKey = this.getInputData(1);
if (typeof optionalPrivateKey !== "undefined" && optionalPrivateKey !== transaction.properties.privateKey) {
    if (optionalPrivateKey && optionalPrivateKey.indexOf("0x") < 0) {
        optionalPrivateKey = "0x" + optionalPrivateKey;
    }
    transaction.onPropertyChanged("privateKey", optionalPrivateKey);
}

let optionalTo = this.getInputData(2);
if (typeof optionalTo !== "undefined" && optionalTo !== transaction.properties.to) {
    transaction.onPropertyChanged("to", optionalTo);
}

let optionalValue = this.getInputData(3);
if (typeof optionalValue !== "undefined" && optionalValue !== transaction.properties.value) {
    transaction.onPropertyChanged("value", optionalValue);
}

let optionalData = this.getInputData(4);
if (typeof optionalData !== "undefined" && optionalData !== transaction.properties.data) {
    if (optionalData && typeof optionalData.indexOf === "function" && optionalData.indexOf("0x") < 0) {
        optionalData = "0x" + optionalData;
    }
    transaction.onPropertyChanged("data", optionalData);
}

let optionalGas = this.getInputData(5);
if (typeof optionalGas !== "undefined" && optionalGas !== transaction.properties.gasLimit) {
    transaction.onPropertyChanged("gasLimit", optionalGas);
}

let optionalMaxPriorityFeePerGas = this.getInputData(8);
if (typeof optionalMaxPriorityFeePerGas !== "undefined" && optionalMaxPriorityFeePerGas !== transaction.properties.maxPriorityFeePerGas) {
    transaction.onPropertyChanged("maxPriorityFeePerGas", optionalMaxPriorityFeePerGas);
}

let optionalMaxFeePerGas = this.getInputData(9);
if (typeof optionalMaxFeePerGas !== "undefined" && optionalMaxFeePerGas !== transaction.properties.maxFeePerGas) {
    transaction.onPropertyChanged("maxFeePerGas", optionalMaxFeePerGas);
}

let optionalAccessList = this.getInputData(10);
if (typeof optionalAccessList !== "undefined" && optionalAccessList !== transaction.properties.accessList) {
    transaction.onPropertyChanged("accessList", optionalAccessList);
}

let optionalNonce = this.getInputData(11);
if (typeof optionalNonce !== "undefined") {
    if (optionalNonce !== transaction.properties.nonce) {
        transaction.onPropertyChanged("nonce", optionalNonce);
    }
} else {
    if (transaction.properties.nonce) {
        transaction.onPropertyChanged("nonce", null);
    }
}

let optionalType = this.getInputData(6);
if (typeof optionalType !== "undefined" && optionalType !== transaction.properties.type) {
    transaction.onPropertyChanged("type", optionalType);
}

let optionalChainId = this.getInputData(7);
if (typeof optionalChainId !== "undefined" && optionalChainId !== transaction.properties.chainId) {
    transaction.onPropertyChanged("chainId", optionalChainId);
}

let optionalStrict = this.getInputData(12);
if (typeof optionalStrict !== "undefined" && optionalStrict !== transaction.properties.strict) {
    transaction.onPropertyChanged("strict", optionalStrict);
}

/*
  this.setOutputData(0,this.transaction)
  this.setOutputData(1,this.signedTransaction)

  if(this.signed){
    this.signed = false
    this.trigger("signed",this.signedTransaction)
  }
  this.setOutputData(3,this.hash)
};
*/

this.setOutputData(0, transaction.properties);  // Output transaction object

if (this.signed) {
    this.signed = false;
    this.trigger("signed", this.signedTransaction);
    this.setOutputData(1, this.signedTransaction);  // Output signedTransaction
}

this.setOutputData(2, this.hash);  // Output hash

Web3Transaction.prototype.onAction = async function (event, args) {
    try {
        await this.craftTransaction();

        const tx = new EthTx(this.transaction);
        console.log(JSON.stringify(tx));

        tx.sign(Buffer.from(this.properties.privateKey.replace("0x", ""), 'hex'));

        const serializedTx = tx.serialize();
        const rawTx = '0x' + serializedTx.toString('hex');
        this.signedTransaction = rawTx;

        console.log(" * * * SIGNED", JSON.stringify(tx));
        this.signed = true;

        const raw = serializedTx.toString('hex');
        const fake = new EthTx(raw);
        this.hash = "0x" + fake.hash(true).toString('hex');

    } catch (e) {
        console.log(e);
        global.setSnackbar(e.message);
    }
};

Web3Transaction.prototype.craftTransaction = async function () {
    try {
        console.log("Crafting a transaction...");
        this.connectWeb3();
        let nonce = this.properties.nonce;

        if ((nonce == null || typeof nonce === "undefined" || typeof this.getInputData(11) === "undefined") && this.properties.privateKey && this.web3) {
            console.log("================ > > > > >  LOADING NONCE");
            try {
                let publicAddress = "0x" + EthUtil.privateToAddress(this.properties.privateKey).toString('hex');

                if (this.debounced) {
                    // waiting
                    nonce = this.debouncedNonce;
                } else {
                    nonce = await this.web3.eth.getTransactionCount(publicAddress, "pending");
                    this.debouncedNonce = nonce;

                    // do a weird little debounce dance so you don't whale the RPC server
                    this.debounced = true;
                    setTimeout(() => {
                        this.debounced = false;
                    }, 3000);
                }
            } catch (e) {
                console.log(e);
            }
        }

        this.transaction = {
            to: this.properties.to || undefined,
            value: parseInt(this.properties.value),
            data: "" + this.properties.data,
            gas: parseInt(this.properties.gasLimit),
            maxFeePerGas: parseInt(this.properties.maxFeePerGas),
            maxPriorityFeePerGas: parseInt(this.properties.maxPriorityFeePerGas),
            nonce: nonce
        };

        console.log("CRAFTED", this.transaction.nonce, this.transaction);
    } catch (e) {
        console.log(e);
    }
};


Web3Transaction.prototype.onPropertyChanged = async function (name, value) {
    if (this.properties[name] !== value) {
        this.properties[name] = value;
        await this.craftTransaction();
    }

    return true;
};

export default Web3Transaction;
