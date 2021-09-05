//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

contract AleCoin is ERC20PresetFixedSupply {
    constructor(address owner) ERC20PresetFixedSupply(
        "AleCoin",
        "ALE",
        100000000 ether,
        owner
    ) {}
}
