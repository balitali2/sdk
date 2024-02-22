import type Web3 from "web3-v4"
import { erc1155v1Abi } from "../v1"
import { NumberDataFormat } from "../../../../common/contracts"

export async function deployErc1155V1(web3: Web3, name: string, symbol: string) {
	const empty = new web3.eth.Contract(erc1155v1Abi, {}, NumberDataFormat)
	const [address] = await web3.eth.getAccounts()
	const deploy = await empty.deploy({
		data: bytecodeErc1155V1,
		arguments: [
			name,
			symbol,
			"0x002ed05478c75974e08f0811517aa0e3eddc1380",
			"https://dev-api.rarible.com/contractMetadata/{address}",
			"ipfs://",
		],
	})
	return deploy.send({ from: address, gas: "4000000" })
}

const bytecodeErc1155V1 = "0x60806040523480156200001157600080fd5b50604051620034a2380380620034a283398101604081905262000034916200043a565b8181818180620000546301ffc9a760e01b6001600160e01b03620001d416565b6200006f632dde656160e21b6001600160e01b03620001d416565b6000620000846001600160e01b036200022f16565b600180546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350620000f8620000e96001600160e01b036200022f16565b6001600160e01b036200023416565b80516200010d9060039060208401906200032f565b5050815162000125915060059060208401906200032f565b506200014163e8a3d48560e01b6001600160e01b03620001d416565b506200015d636cdb3d1360e11b6001600160e01b03620001d416565b505084516200017490600a9060208801906200032f565b5083516200018a90600b9060208701906200032f565b506200019f836001600160e01b036200023416565b620001c9604051620001b19062000604565b6040519081900390206001600160e01b03620001d416565b505050505062000703565b6001600160e01b031980821614156200020a5760405162461bcd60e51b8152600401620002019062000623565b60405180910390fd5b6001600160e01b0319166000908152602081905260409020805460ff19166001179055565b335b90565b6200024f8160026200028660201b62001af11790919060201c565b6040516001600160a01b038216907f47d1c22a25bb3a5d4e481b9b1e6944c2eade3181a0a20b495ed61d35b5323f2490600090a250565b6200029b82826001600160e01b03620002e016565b15620002bb5760405162461bcd60e51b8152600401620002019062000611565b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b60006001600160a01b0382166200030b5760405162461bcd60e51b8152600401620002019062000635565b506001600160a01b03811660009081526020839052604090205460ff165b92915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200037257805160ff1916838001178555620003a2565b82800160010185558215620003a2579182015b82811115620003a257825182559160200191906001019062000385565b50620003b0929150620003b4565b5090565b6200023191905b80821115620003b05760008155600101620003bb565b80516200032981620006e9565b600082601f830112620003f057600080fd5b81516200040762000401826200066e565b62000647565b915080825260208301602083018583830111156200042457600080fd5b62000431838284620006b6565b50505092915050565b600080600080600060a086880312156200045357600080fd5b85516001600160401b038111156200046a57600080fd5b6200047888828901620003de565b95505060208601516001600160401b038111156200049557600080fd5b620004a388828901620003de565b9450506040620004b688828901620003d1565b93505060608601516001600160401b03811115620004d357600080fd5b620004e188828901620003de565b92505060808601516001600160401b03811115620004fe57600080fd5b6200050c88828901620003de565b9150509295509295909350565b600062000528601f8362000696565b7f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500815260200192915050565b600062000563601c8362000696565b7f4552433136353a20696e76616c696420696e7465726661636520696400000000815260200192915050565b60006200059e60228362000696565b7f526f6c65733a206163636f756e7420697320746865207a65726f206164647265815261737360f01b602082015260400192915050565b6000620005e46011836200069f565b704d494e545f574954485f4144445245535360781b815260110192915050565b60006200032982620005d5565b60208082528101620003298162000519565b60208082528101620003298162000554565b6020808252810162000329816200058f565b6040518181016001600160401b03811182821017156200066657600080fd5b604052919050565b60006001600160401b038211156200068557600080fd5b506020601f91909101601f19160190565b90815260200190565b919050565b60006001600160a01b03821662000329565b60005b83811015620006d3578181015183820152602001620006b9565b83811115620006e3576000848401525b50505050565b620006f481620006a4565b81146200070057600080fd5b50565b612d8f80620007136000396000f3fe608060405234801561001057600080fd5b50600436106101c35760003560e01c806395d89b41116100f9578063e5c8b03d11610097578063eb12d61e11610071578063eb12d61e1461039f578063f242432a146103b2578063f2fde38b146103c5578063f5298aca146103d8576101c3565b8063e5c8b03d1461037c578063e8a3d48514610384578063e985e9c51461038c576101c3565b8063b9c4d9fb116100d3578063b9c4d9fb1461032e578063c0ac99831461034e578063c6bf326214610356578063cd53d08e14610369576101c3565b806395d89b411461030057806399e0dd7c14610308578063a22cb4651461031b576101c3565b80634e1273f4116101665780637df73e27116101405780637df73e27146102bd5780638da5cb5b146102d05780638f32d59b146102e5578063938e3d7b146102ed576101c3565b80634e1273f4146102815780636308f1cd14610294578063715018a6146102b5576101c3565b80630e316ab7116101a25780630e316ab7146102265780630e89341c1461023b5780630ebd4c7f1461024e5780632eb2c2d61461026e576101c3565b8062fdd58e146101c857806301ffc9a7146101f157806306fdde0314610211575b600080fd5b6101db6101d6366004611fb9565b6103eb565b6040516101e89190612bad565b60405180910390f35b6102046101ff3660046120a4565b610415565b6040516101e89190612a20565b610219610434565b6040516101e89190612a6c565b610239610234366004611ddb565b6104c2565b005b610219610249366004612114565b6104fb565b61026161025c366004612114565b610506565b6040516101e89190612a0f565b61023961027c366004611e33565b6105f9565b61026161028f366004612036565b6108ef565b6102a76102a2366004612132565b6109c9565b6040516101e8929190612904565b610239610a0c565b6102046102cb366004611ddb565b610a7a565b6102d8610a8d565b6040516101e891906128f6565b610204610a9d565b6102396102fb3660046120e0565b610ac3565b610219610af0565b6102396103163660046120e0565b610b4b565b610239610329366004611f89565b610b78565b61034161033c366004612114565b610be7565b6040516101e891906129cd565b610219610cdf565b610239610364366004612151565b610d3a565b6102d8610377366004612114565b610dea565b610239610e05565b610219610e17565b61020461039a366004611df9565b610e72565b6102396103ad366004611ddb565b610ea0565b6102396103c0366004611efa565b610ecd565b6102396103d3366004611ddb565b611087565b6102396103e6366004611fe9565b6110b4565b60008181526006602090815260408083206001600160a01b03861684529091529020545b92915050565b6001600160e01b03191660009081526020819052604090205460ff1690565b600a805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104ba5780601f1061048f576101008083540402835291602001916104ba565b820191906000526020600020905b81548152906001019060200180831161049d57829003601f168201915b505050505081565b6104ca610a9d565b6104ef5760405162461bcd60e51b81526004016104e690612b0d565b60405180910390fd5b6104f8816111ac565b50565b606061040f826111f4565b60008181526009602090815260408083208054825181850281018501909352808352606094859484015b82821015610578576000848152602090819020604080518082019091526002850290910180546001600160a01b03168252600190810154828401529083529092019101610530565b505050509050606081516040519080825280602002602001820160405280156105ab578160200160208202803883390190505b50905060005b82518110156105f1578281815181106105c657fe5b6020026020010151602001518282815181106105de57fe5b60209081029190910101526001016105b1565b509392505050565b6001600160a01b03871661061f5760405162461bcd60e51b81526004016104e690612abd565b84831461063e5760405162461bcd60e51b81526004016104e690612b4d565b6001600160a01b03881633148061067d57506001600160a01b038816600090815260076020908152604080832033845290915290205460ff1615156001145b6106995760405162461bcd60e51b81526004016104e690612aed565b60005b858110156107ce5760008787838181106106b257fe5b90506020020135905060008686848181106106c957fe5b90506020020135905061071b816006600085815260200190815260200160002060008e6001600160a01b03166001600160a01b031681526020019081526020016000205461132f90919063ffffffff16565b6006600084815260200190815260200160002060008d6001600160a01b03166001600160a01b031681526020019081526020016000208190555061079e6006600084815260200190815260200160002060008c6001600160a01b03166001600160a01b03168152602001908152602001600020548261134190919063ffffffff16565b60009283526006602090815260408085206001600160a01b038e168652909152909220919091555060010161069c565b50866001600160a01b0316886001600160a01b0316336001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8989898960405161082294939291906129de565b60405180910390a461083c876001600160a01b031661134e565b156108e5576108e533898989898080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050604080516020808d0282810182019093528c82529093508c92508b91829185019084908082843760009201919091525050604080516020601f8c018190048102820181019092528a815292508a915089908190840183828082843760009201919091525061138a92505050565b5050505050505050565b60608382146108fd57600080fd5b604080518581526020808702820101909152606090858015610929578160200160208202803883390190505b50905060005b858110156109bf576006600086868481811061094757fe5b905060200201358152602001908152602001600020600088888481811061096a57fe5b905060200201602061097f9190810190611ddb565b6001600160a01b03166001600160a01b03168152602001908152602001600020548282815181106109ac57fe5b602090810291909101015260010161092f565b5095945050505050565b600960205281600052604060002081815481106109e257fe5b6000918252602090912060029091020180546001909101546001600160a01b039091169250905082565b610a14610a9d565b610a305760405162461bcd60e51b81526004016104e690612b0d565b6001546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600180546001600160a01b0319169055565b600061040f60028363ffffffff61143916565b6001546001600160a01b03165b90565b6001546000906001600160a01b0316610ab4611481565b6001600160a01b031614905090565b610acb610a9d565b610ae75760405162461bcd60e51b81526004016104e690612b0d565b6104f881611485565b600b805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104ba5780601f1061048f576101008083540402835291602001916104ba565b610b53610a9d565b610b6f5760405162461bcd60e51b81526004016104e690612b0d565b6104f88161149c565b3360008181526007602090815260408083206001600160a01b038716808552925291829020805460ff191685151517905590519091907f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3190610bdb908590612a20565b60405180910390a35050565b60008181526009602090815260408083208054825181850281018501909352808352606094859484015b82821015610c59576000848152602090819020604080518082019091526002850290910180546001600160a01b03168252600190810154828401529083529092019101610c11565b50505050905060608151604051908082528060200260200182016040528015610c8c578160200160208202803883390190505b50905060005b82518110156105f157828181518110610ca757fe5b602002602001015160000151828281518110610cbf57fe5b6001600160a01b0390921660209283029190910190910152600101610c92565b6003805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104ba5780601f1061048f576101008083540402835291602001916104ba565b610db960013089604051602001610d529291906128d0565b6040516020818303038152906040528051906020012088888860405160008152602001604052604051610d889493929190612a2e565b6020604051602081039080840390855afa158015610daa573d6000803e3d6000fd5b50505060206040510351610a7a565b610dd55760405162461bcd60e51b81526004016104e690612b8d565b610de1878484846114af565b50505050505050565b6008602052600090815260409020546001600160a01b031681565b610e15610e10611481565b6111ac565b565b6005805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104ba5780601f1061048f576101008083540402835291602001916104ba565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b610ea8610a9d565b610ec45760405162461bcd60e51b81526004016104e690612b0d565b6104f8816117fd565b6001600160a01b038516610ef35760405162461bcd60e51b81526004016104e690612b7d565b6001600160a01b038616331480610f3257506001600160a01b038616600090815260076020908152604080832033845290915290205460ff1615156001145b610f4e5760405162461bcd60e51b81526004016104e690612aed565b60008481526006602090815260408083206001600160a01b038a168452909152902054610f81908463ffffffff61132f16565b60008581526006602090815260408083206001600160a01b038b81168552925280832093909355871681522054610fb9908490611341565b60008581526006602090815260408083206001600160a01b03808b168086529190935292819020939093559151909188169033907fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f629061101c9089908990612bef565b60405180910390a4611036856001600160a01b031661134e565b1561107f5761107f338787878787878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061184592505050565b505050505050565b61108f610a9d565b6110ab5760405162461bcd60e51b81526004016104e690612b0d565b6104f8816118f4565b6001600160a01b0383163314806110f357506001600160a01b038316600090815260076020908152604080832033845290915290205460ff1615156001145b61110f5760405162461bcd60e51b81526004016104e690612add565b60008281526006602090815260408083206001600160a01b0387168452909152902054611142908263ffffffff61132f16565b60008381526006602090815260408083206001600160a01b038816808552925280832093909355915190919033907fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f629061119f9087908790612bef565b60405180910390a4505050565b6111bd60028263ffffffff61197616565b6040516001600160a01b038216907f3525e22824a8a7df2c9a6029941c824cf95b6447f1e13d5128fd3826d35afe8b90600090a250565b6000818152600460209081526040918290208054835160026001831615610100026000190190921691909104601f810184900484028201840190945283815260609361040f9391929183018282801561128e5780601f106112635761010080835404028352916020019161128e565b820191906000526020600020905b81548152906001019060200180831161127157829003601f168201915b505060038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281529550919350915083018282801561131c5780601f106112f15761010080835404028352916020019161131c565b820191906000526020600020905b8154815290600101906020018083116112ff57829003601f168201915b50505050506119be90919063ffffffff16565b60008282111561133b57fe5b50900390565b8181018281101561040f57fe5b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081811480159061138257508115155b949350505050565b60405163bc197c8160e01b808252906001600160a01b0386169063bc197c81906113c0908a908a90899089908990600401612926565b602060405180830381600087803b1580156113da57600080fd5b505af11580156113ee573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525061141291908101906120c2565b6001600160e01b0319161461107f5760405162461bcd60e51b81526004016104e690612afd565b60006001600160a01b0382166114615760405162461bcd60e51b81526004016104e690612b1d565b506001600160a01b03166000908152602091909152604090205460ff1690565b3390565b8051611498906005906020840190611b61565b5050565b8051611498906003906020840190611b61565b6000848152600860205260409020546001600160a01b0316156114e45760405162461bcd60e51b81526004016104e690612b2d565b816115015760405162461bcd60e51b81526004016104e690612b3d565b60008151116115225760405162461bcd60e51b81526004016104e690612b9d565b60008481526008602090815260409182902080546001600160a01b03191633179055845182518181528183028101909201909252606091801561156f578160200160208202803883390190505b5090506060845160405190808252806020026020018201604052801561159f578160200160208202803883390190505b50905060005b85518110156117125760006001600160a01b03168682815181106115c557fe5b6020026020010151600001516001600160a01b031614156115f85760405162461bcd60e51b81526004016104e690612b5d565b85818151811061160457fe5b602002602001015160200151600014156116305760405162461bcd60e51b81526004016104e690612a7d565b6000878152600960205260409020865187908390811061164c57fe5b602090810291909101810151825460018082018555600094855293839020825160029092020180546001600160a01b0319166001600160a01b0390921691909117815591015191015585518690829081106116a357fe5b6020026020010151600001518382815181106116bb57fe5b60200260200101906001600160a01b031690816001600160a01b0316815250508581815181106116e757fe5b6020026020010151602001518282815181106116ff57fe5b60209081029190910101526001016115a5565b50845115611756577f99aba1d63749cfd5ad1afda7c4663840924d54eb5f005bbbeadedc6ec13674b286838360405161174d93929190612bbb565b60405180910390a15b6000868152600660209081526040808320338452909152902084905561177c8684611ab3565b604051339060009082907fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62906117b5908b908a90612bef565b60405180910390a4857f6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b846040516117ed9190612a6c565b60405180910390a2505050505050565b61180e60028263ffffffff611af116565b6040516001600160a01b038216907f47d1c22a25bb3a5d4e481b9b1e6944c2eade3181a0a20b495ed61d35b5323f2490600090a250565b60405163f23a6e6160e01b808252906001600160a01b0386169063f23a6e619061187b908a908a90899089908990600401612986565b602060405180830381600087803b15801561189557600080fd5b505af11580156118a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052506118cd91908101906120c2565b6001600160e01b0319161461107f5760405162461bcd60e51b81526004016104e690612b6d565b6001600160a01b03811661191a5760405162461bcd60e51b81526004016104e690612a9d565b6001546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600180546001600160a01b0319166001600160a01b0392909216919091179055565b6119808282611439565b61199c5760405162461bcd60e51b81526004016104e690612acd565b6001600160a01b0316600090815260209190915260409020805460ff19169055565b6060808390506060839050606081518351016040519080825280601f01601f1916602001820160405280156119fa576020820181803883390190505b5090506000805b8451811015611a5257848181518110611a1657fe5b602001015160f81c60f81b838380600101945081518110611a3357fe5b60200101906001600160f81b031916908160001a905350600101611a01565b5060005b8351811015611aa757838181518110611a6b57fe5b602001015160f81c60f81b838380600101945081518110611a8857fe5b60200101906001600160f81b031916908160001a905350600101611a56565b50909695505050505050565b6000828152600860205260409020546001600160a01b0316611ae75760405162461bcd60e51b81526004016104e690612aad565b6114988282611b3d565b611afb8282611439565b15611b185760405162461bcd60e51b81526004016104e690612a8d565b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b60008281526004602090815260409091208251611b5c92840190611b61565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611ba257805160ff1916838001178555611bcf565b82800160010185558215611bcf579182015b82811115611bcf578251825591602001919060010190611bb4565b50611bdb929150611bdf565b5090565b610a9a91905b80821115611bdb5760008155600101611be5565b803561040f81612d14565b60008083601f840112611c1657600080fd5b5081356001600160401b03811115611c2d57600080fd5b602083019150836020820283011115611c4557600080fd5b9250929050565b600082601f830112611c5d57600080fd5b8135611c70611c6b82612c23565b612bfd565b91508181835260208401935060208101905083856040840282011115611c9557600080fd5b60005b83811015611cc35781611cab8882611d89565b84525060209092019160409190910190600101611c98565b5050505092915050565b803561040f81612d28565b803561040f81612d31565b803561040f81612d3a565b805161040f81612d3a565b60008083601f840112611d0b57600080fd5b5081356001600160401b03811115611d2257600080fd5b602083019150836001820283011115611c4557600080fd5b600082601f830112611d4b57600080fd5b8135611d59611c6b82612c43565b91508082526020830160208301858383011115611d7557600080fd5b611d80838284612cb7565b50505092915050565b600060408284031215611d9b57600080fd5b611da56040612bfd565b90506000611db38484611bf9565b8252506020611dc484848301611cd8565b60208301525092915050565b803561040f81612d43565b600060208284031215611ded57600080fd5b60006113828484611bf9565b60008060408385031215611e0c57600080fd5b6000611e188585611bf9565b9250506020611e2985828601611bf9565b9150509250929050565b60008060008060008060008060a0898b031215611e4f57600080fd5b6000611e5b8b8b611bf9565b9850506020611e6c8b828c01611bf9565b97505060408901356001600160401b03811115611e8857600080fd5b611e948b828c01611c04565b965096505060608901356001600160401b03811115611eb257600080fd5b611ebe8b828c01611c04565b945094505060808901356001600160401b03811115611edc57600080fd5b611ee88b828c01611cf9565b92509250509295985092959890939650565b60008060008060008060a08789031215611f1357600080fd5b6000611f1f8989611bf9565b9650506020611f3089828a01611bf9565b9550506040611f4189828a01611cd8565b9450506060611f5289828a01611cd8565b93505060808701356001600160401b03811115611f6e57600080fd5b611f7a89828a01611cf9565b92509250509295509295509295565b60008060408385031215611f9c57600080fd5b6000611fa88585611bf9565b9250506020611e2985828601611ccd565b60008060408385031215611fcc57600080fd5b6000611fd88585611bf9565b9250506020611e2985828601611cd8565b600080600060608486031215611ffe57600080fd5b600061200a8686611bf9565b935050602061201b86828701611cd8565b925050604061202c86828701611cd8565b9150509250925092565b6000806000806040858703121561204c57600080fd5b84356001600160401b0381111561206257600080fd5b61206e87828801611c04565b945094505060208501356001600160401b0381111561208c57600080fd5b61209887828801611c04565b95989497509550505050565b6000602082840312156120b657600080fd5b60006113828484611ce3565b6000602082840312156120d457600080fd5b60006113828484611cee565b6000602082840312156120f257600080fd5b81356001600160401b0381111561210857600080fd5b61138284828501611d3a565b60006020828403121561212657600080fd5b60006113828484611cd8565b6000806040838503121561214557600080fd5b6000611fd88585611cd8565b600080600080600080600060e0888a03121561216c57600080fd5b60006121788a8a611cd8565b97505060206121898a828b01611dd0565b965050604061219a8a828b01611cd8565b95505060606121ab8a828b01611cd8565b94505060808801356001600160401b038111156121c757600080fd5b6121d38a828b01611c4c565b93505060a06121e48a828b01611cd8565b92505060c08801356001600160401b0381111561220057600080fd5b61220c8a828b01611d3a565b91505092959891949750929550565b6000612227838361223b565b505060200190565b60006122278383612381565b61224481612c7d565b82525050565b600061225582612c70565b61225f8185612c74565b935061226a83612c6a565b8060005b83811015612298578151612282888261221b565b975061228d83612c6a565b92505060010161226e565b509495945050505050565b60006122ae82612c70565b6122b88185612c74565b93506122c383612c6a565b8060005b838110156122985781516122db888261221b565b97506122e683612c6a565b9250506001016122c7565b60006122fd8385612c74565b93506001600160fb1b0383111561231357600080fd5b602083029250612324838584612cb7565b50500190565b600061233582612c70565b61233f8185612c74565b935061234a83612c6a565b8060005b83811015612298578151612362888261222f565b975061236d83612c6a565b92505060010161234e565b61224481612c88565b61224481610a9a565b600061239582612c70565b61239f8185612c74565b93506123af818560208601612cc3565b6123b881612d04565b9093019392505050565b6122446123ce82612cac565b612cf3565b60006123e0601c83612c74565b7f4665652076616c75652073686f756c6420626520706f73697469766500000000815260200192915050565b6000612419601f83612c74565b7f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500815260200192915050565b6000612452602683612c74565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206181526564647265737360d01b602082015260400192915050565b600061249a602083612c74565b7f5f736574546f6b656e5552493a20546f6b656e2073686f756c64206578697374815260200192915050565b60006124d3602583612c74565b7f64657374696e6174696f6e2061646472657373206d757374206265206e6f6e2d8152643d32b9379760d91b602082015260400192915050565b600061251a602183612c74565b7f526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c8152606560f81b602082015260400192915050565b600061255d602b83612c74565b7f4e656564206f70657261746f7220617070726f76616c20666f7220337264207081526a30b93a3c90313ab937399760a91b602082015260400192915050565b60006125aa602f83612c74565b7f4e656564206f70657261746f7220617070726f76616c20666f7220337264207081526e30b93a3c903a3930b739b332b9399760891b602082015260400192915050565b60006125fb603e83612c74565b7f636f6e74726163742072657475726e656420616e20756e6b6e6f776e2076616c81527f75652066726f6d206f6e45524331313535426174636852656365697665640000602082015260400192915050565b600061265a602083612c74565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572815260200192915050565b6000612693602283612c74565b7f526f6c65733a206163636f756e7420697320746865207a65726f206164647265815261737360f01b602082015260400192915050565b60006126d7601783612c74565b7f546f6b656e20697320616c7265616479206d696e746564000000000000000000815260200192915050565b6000612710601983612c74565b7f537570706c792073686f756c6420626520706f73697469766500000000000000815260200192915050565b6000612749602983612c74565b7f5f69647320616e64205f76616c756573206172726179206c656e676874206d7581526839ba1036b0ba31b41760b91b602082015260400192915050565b6000612794601b83612c74565b7f526563697069656e742073686f756c642062652070726573656e740000000000815260200192915050565b60006127cd603983612c74565b7f636f6e74726163742072657475726e656420616e20756e6b6e6f776e2076616c81527f75652066726f6d206f6e45524331313535526563656976656400000000000000602082015260400192915050565b600061282c601583612c74565b742fba379036bab9ba103132903737b716bd32b9379760591b815260200192915050565b600061285d601a83612c74565b7f7369676e65722073686f756c64207369676e20746f6b656e4964000000000000815260200192915050565b6000612896601183612c74565b701d5c9a481cda1bdd5b19081899481cd95d607a1b815260200192915050565b6122446128c282610a9a565b610a9a565b61224481612ca6565b60006128dc82856123c2565b6014820191506128ec82846128b6565b5060200192915050565b6020810161040f828461223b565b60408101612912828561223b565b61291f6020830184612381565b9392505050565b60a08101612934828861223b565b612941602083018761223b565b8181036040830152612953818661232a565b90508181036060830152612967818561232a565b9050818103608083015261297b818461238a565b979650505050505050565b60a08101612994828861223b565b6129a1602083018761223b565b6129ae6040830186612381565b6129bb6060830185612381565b818103608083015261297b818461238a565b6020808252810161291f81846122a3565b604080825281016129f08186886122f1565b90508181036020830152612a058184866122f1565b9695505050505050565b6020808252810161291f818461232a565b6020810161040f8284612378565b60808101612a3c8287612381565b612a4960208301866128c7565b612a566040830185612381565b612a636060830184612381565b95945050505050565b6020808252810161291f818461238a565b6020808252810161040f816123d3565b6020808252810161040f8161240c565b6020808252810161040f81612445565b6020808252810161040f8161248d565b6020808252810161040f816124c6565b6020808252810161040f8161250d565b6020808252810161040f81612550565b6020808252810161040f8161259d565b6020808252810161040f816125ee565b6020808252810161040f8161264d565b6020808252810161040f81612686565b6020808252810161040f816126ca565b6020808252810161040f81612703565b6020808252810161040f8161273c565b6020808252810161040f81612787565b6020808252810161040f816127c0565b6020808252810161040f8161281f565b6020808252810161040f81612850565b6020808252810161040f81612889565b6020810161040f8284612381565b60608101612bc98286612381565b8181036020830152612bdb818561224a565b90508181036040830152612a63818461232a565b604081016129128285612381565b6040518181016001600160401b0381118282101715612c1b57600080fd5b604052919050565b60006001600160401b03821115612c3957600080fd5b5060209081020190565b60006001600160401b03821115612c5957600080fd5b506020601f91909101601f19160190565b60200190565b5190565b90815260200190565b600061040f82612c9a565b151590565b6001600160e01b03191690565b6001600160a01b031690565b60ff1690565b600061040f82612c7d565b82818337506000910152565b60005b83811015612cde578181015183820152602001612cc6565b83811115612ced576000848401525b50505050565b600061040f82600061040f82612d0e565b601f01601f191690565b60601b90565b612d1d81612c7d565b81146104f857600080fd5b612d1d81612c88565b612d1d81610a9a565b612d1d81612c8d565b612d1d81612ca656fea365627a7a72315820101c965b48a5ab3ccb23dfb590c83d0df759f134af789de73fe91ed5f75798fc6c6578706572696d656e74616cf564736f6c63430005110040"
