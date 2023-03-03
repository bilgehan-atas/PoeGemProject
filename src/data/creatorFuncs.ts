//   // data creator func
//   // Put inside data service
//   creator$ = combineLatest([this.zaltGemsProb$, this.altGemsWeights$]).pipe(
//     map((items) => {
//       const altGemsProb = items[0];
//       const altGemsWeights = items[1];

//       return altGemsProb.map((gem) => {
//         const find = altGemsWeights.find(i => i.Name === gem.name)
//         const totalW = Number(find.Superior) + Number(find.Anomalous ? find.Anomalous : 0) + Number(find.Divergent ? find.Divergent : 0) + Number(find.Phantasmal ? find.Phantasmal : 0) - Number(find[gem.from_gem])
//         const s_tries = totalW / Number(find[gem.to_gem])
//         gem['s_tries'] = s_tries
//         return gem
//       })
//     })
//   );