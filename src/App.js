import { useState } from 'react';
import React from 'react';

function Ssquare({ id, value, onSsquareClick }) {
  if (id == 16) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>玉</button>);
  } else if (id == 15 || id == 17) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>金</button>);
  } else if (id == 14 || id == 18) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>銀</button>);
  } else if (id == 13 || id == 19) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>桂</button>);
  } else if (id == 12 || id == 20) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>香</button>);
  } else if (id == 24) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>飛</button>);
  } else if (id == 30) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>角</button>);
  } else if (id > 33 && id < 43) {
    return (<button id={id} className="player1" onClick={onSsquareClick}>歩</button>);
  } else if (id == 104) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>王</button>);
  } else if (id == 103 || id == 105) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>金</button>);
  } else if (id == 102 || id == 106) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>銀</button>);
  } else if (id == 101 || id == 107) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>桂</button>);
  } else if (id == 100 || id == 108) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>香</button>);
  } else if (id == 96) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>飛</button>);
  } else if (id == 90) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>角</button>);
  } else if (id > 77 && id < 87) {
    return (<button id={id} className="player2" onClick={onSsquareClick}>歩</button>);
  } else if (id > 0 && id < 10) {
    return (<button id={id} className="player1keep" onClick={onSsquareClick}>{value}</button>);
  } else if (id < 120 && id > 110) {
    return (<button id={id} className="player2keep" onClick={onSsquareClick}>{value}</button>);
  } else {
    return (<button id={id} className="Ssquare" onClick={onSsquareClick}>{value}</button>);
  }
}

function NARI(player, koma, num1, num2) {
  var nari;
  if ((player == "player1" && (num1 >= 78 || num2 >= 78)) || (player == "player2" && (num1 <= 42 || num2 <= 42))) {
    if (koma == "歩") {
      nari = window.confirm('成り！？');
      if (nari) { koma = "と"; }
    } else if (koma == "銀") {
      nari = window.confirm('成り！？');
      if (nari) { koma = "全"; }
    } else if (koma == "桂") {
      nari = window.confirm('成り！？');
      if (nari) { koma = "圭"; }
    } else if (koma == "香") {
      nari = window.confirm('成り！？');
      if (nari) { koma = "杏"; }
    } else if (koma == "飛") {
      nari = window.confirm('成り！？');
      if (nari) { koma = "龍"; }
    } else if (koma == "角") {
      nari = window.confirm('成り！？');
      if (nari) { koma = "馬"; }
    }
  }
  return (koma);
}
function keep(moveplayer, playerkeeplist, koma, sum) {
  let bool = false;
  for (let h = 0; h < playerkeeplist.length; h++) {
    if (playerkeeplist[h][0] == koma) {
      document.getElementById(h + sum).textContent = koma;
      playerkeeplist[h][1]++;
      bool = true;
    }
  }
  if (bool == false) {
    document.getElementById(playerkeeplist.length + sum).textContent = koma;
    document.getElementById(playerkeeplist.length + sum).className = moveplayer;
    playerkeeplist.push([koma, 1]);
  }
  return (playerkeeplist);
}
function getkoma(koma) {
  if (koma == "と") {
    koma = "歩";
  } else if (koma == "全") {
    koma = "銀";
  } else if (koma == "圭") {
    koma = "桂";
  } else if (koma == "杏") {
    koma = "香";
  } else if (koma == "龍") {
    koma = "飛";
  } else if (koma == "馬") {
    koma = "角";
  }
  return (koma);
}
var movename = null;
var num = null;
var classtype = null;
var gomove = [];
var player1keep = [];
var player2keep = [];
var playturn = "player1"
function Board({ xIsNext, Ssquares, onPlay }) {
  function handleClick(i) {

    function GO(koma, classT) {
      let go = [];
      if (classT == "player1keep" || classT == "player2keep") {
        for (let j = 12; j < 109; j++) {
          if (document.getElementById(j).className == "Ssquare") {
            let ho = true;
            if (koma == "歩" && classT == "player1keep") {
              for (let h = j % 11 + 11; h < 109; h += 11) {
                if (document.getElementById(h).textContent == "歩" &&
                  document.getElementById(h).className == "player1") {
                  ho = false;
                }
              }
            } else if (koma == "歩" && classT == "player2keep") {
              for (let h = j % 11 + 11; h < 109; h += 11) {
                if (document.getElementById(h).textContent == "歩" &&
                  document.getElementById(h).className == "player2") {
                  ho = false;
                }
              }
            }
            if (ho == true) { go.push(j); }
          }
          if (j % 11 == 9) {
            j += 2;
          }
        }
      } else if (koma == "歩") {
        if (classT == "player1" && document.getElementById(i + 11).className != classT) {
          if (document.getElementById(i + 11).className != "player2keep") {
            go.push(i + 11);
          }
        } else if (document.getElementById(i - 11).className != classT) {
          if (classT == "player2" && document.getElementById(i - 11).className != "player1keep") {
            go.push(i - 11);
          }
        }
      } else if (koma == "玉" || koma == "王") {
        let cango = [-12, -11, -10, -1, 1, 10, 11, 12];
        go = cando(go, cango);
      } else if (koma == "金" || koma == "全" ||
        koma == "圭" || koma == "杏" || koma == "と") {
        if (classT == "player1") {
          let cango = [-11, -1, 1, 10, 11, 12];
          go = cando(go, cango);
        } else {
          let cango = [-12, -11, -10, -1, 1, 11];
          go = cando(go, cango);
        }
      } else if (koma == "銀") {
        if (classT == "player1") {
          let cango = [-12, -10, 10, 11, 12];
          go = cando(go, cango);
        } else {
          let cango = [-12, -11, -10, 10, 12];
          go = cando(go, cango);
        }
      } else if (koma == "桂") {
        if (classT == "player1") {
          let cango = [21, 23];
          go = cando(go, cango);
        } else if (classT == "player2") {
          let cango = [-21, -23];
          go = cando(go, cango);
        }
      } else if (koma == "香") {
        if (classT == "player1") {
          for (let j = i + 11; j < 109; j += 11) {
            if (document.getElementById(j).className == classT) {
              break;
            } else if (document.getElementById(j).className != "Ssquare") {
              go.push(j);
              break;
            } else {
              go.push(j);
            }
          }
        } else {
          for (let j = i - 11; j > 11; j -= 11) {
            if (document.getElementById(j).className == classT) {
              break;
            } else if (document.getElementById(j).className != "Ssquare") {
              go.push(j);
              break;
            } else {
              go.push(j);
            }
          }
        }
      } else if (koma == "飛") {
        for (let j = i + 11; j < 109; j += 11) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
        for (let j = i - 11; j > 11; j -= 11) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
        for (let j = i + 1; j % 11 < 10; j++) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
        for (let j = i - 1; j % 11 > 0; j--) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
      } else if (koma == "龍") {
        for (let j = i + 11; j < 109; j += 11) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
        for (let j = i - 11; j > 11; j -= 11) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
        for (let j = i + 1; j % 11 < 10; j++) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
        for (let j = i - 1; j % 11 > 0; j--) {
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else {
            go.push(j);
          }
        }
        let cango = [-12, -10, 10, 12];
        go = cando(go, cango);
      } else if (koma == "角") {
        for (let j = i + 12; j < 109; j += 12) {
          if (j % 11 == 10) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
        for (let j = i - 12; j > 11; j -= 12) {
          if (j % 11 == 0) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
        for (let j = i + 10; j < 109; j += 10) {
          if (j % 11 == 0) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
        for (let j = i - 10; j > 10; j -= 10) {
          if (j % 11 == 10) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
      } else if (koma == "馬") {
        for (let j = i + 12; j < 109; j += 12) {
          if (j % 11 == 10) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
        for (let j = i - 12; j > 11; j -= 12) {
          if (j % 11 == 0) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
        for (let j = i + 10; j < 109; j += 10) {
          if (j % 11 == 0) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
        for (let j = i - 10; j > 10; j -= 10) {
          if (j % 11 == 10) {
            break
          }
          if (document.getElementById(j).className == classT) {
            break;
          } else if (document.getElementById(j).className != "Ssquare") {
            go.push(j);
            break;
          } else if (document.getElementById(j).className == "Ssquare") {
            go.push(j);
          }
        }
        let cango = [-11, -1, 1, 11];
        go = cando(go, cango);
      }
      return (go);
    }
    const nextSsquares = Ssquares.slice();

    onPlay(nextSsquares);
    function cando(list1, cango) {
      for (let h = 0; h < cango.length; h++) {
        if (document.getElementById(i + cango[h]) % 11 != 10 &&
          document.getElementById(i + cango[h]) % 11 != 0) {
          if (document.getElementById(i + cango[h]).className != classtype &&
            document.getElementById(i + cango[h]).className != "player1keep" &&
            document.getElementById(i + cango[h]).className != "player2keep") {
            list1.push(i + cango[h]);
          }
        }
      }
      return (list1);
    }
    var str = document.getElementById(i);
    if (movename == null && movename != "") {
      if (document.getElementById(i).className != playturn &&
        document.getElementById(i).className != (playturn + "keep")) {
        return;
      } else if (playturn == "player1") {
        playturn = "player2";
      } else {
        playturn = "player1";
      }
      num = i;
      classtype = str.className
      movename = str.textContent;

      gomove = GO(movename, classtype);
      for (let h = 0; h < gomove.length; h++) {
        if (document.getElementById(gomove[h]).textContent != "") {
          if (document.getElementById(gomove[h]).className == "player1") {
            document.getElementById(gomove[h]).style.textShadow = "5px 5px 5px black";
          } else {
            document.getElementById(gomove[h]).style.textShadow = "5px 5px 5px white";
          }
        } else {
          document.getElementById(gomove[h]).textContent = "□";
        }
      }
      if (gomove.length == 0) {
        movename = null;
        num = null;
        classtype = null;
        gomove = [];
      }

    } else if (str.className != classtype) {
      var number = document.getElementById(num);
      movename = NARI(number.className, number.textContent, i, num);
      for (let j = 0; j < gomove.length; j++) {
        if (i == gomove[j]) {
          if (number.className == "player1" &&
            str.className == "player2") {
            str.textContent = getkoma(str.textContent);
            player1keep = keep("player1keep", player1keep, str.textContent, 1);
          } else if (number.className == "player2" &&
            str.className == "player1") {
            let bool = false;
            str.textContent = getkoma(str.textContent);
            player2keep = keep("player2keep", player2keep, str.textContent, 111);
          }
          if (str.className == "player1keep") {
            str.className = "player1";
          } else if (str.className == "player2keep") {
            str.className = "player2";
          }
          document.getElementById(i).textContent = movename;
          if (number.className == "player1keep") {
            if (player1keep[num - 1][1] != 0) {
              str.className = "player1";
              player1keep[num - 1][1]--;
            }
            if (player1keep[num - 1][1] == 0) {
              number.textContent = "";
            }
          } else if (number.className == "player2keep") {
            if (player2keep[num - 111][1] != 0) {
              str.className = "player2";
              player2keep[num - 111][1]--;
            } if (player2keep[num - 111][1] == 0) {
              number.textContent = "";
            }
          } else {
            number.textContent = "";
            str.className = classtype;
            number.className = "Ssquare";
          }
          let checklist = GO(movename, str.className);
          for (let f = 0; f < checklist.length; f++) {
            if (document.getElementById(checklist[f]).textContent == "王" ||
              document.getElementById(checklist[f]).textContent == "玉") {
              alert("王手");
            }
          }
          movename = null;
          num = null;
          classtype = null;
          gomove = [];

          if (document.getElementById(-1).textContent == "turn:player1") {
            document.getElementById(-1).textContent = "turn:player2";
          } else if (document.getElementById(-1).textContent == "turn:player2") {
            document.getElementById(-1).textContent = "turn:player1";
          }
          for (let j = 12; j < 109; j++) {
            if (document.getElementById(j).textContent == "□") {
              document.getElementById(j).textContent = "";
              document.getElementById(j).style.textShadow = null;
            }
            document.getElementById(j).style.textShadow = null;
            if (j % 11 == 9) {
              j += 2;
            }
          }
          break
        }
      }


      onPlay(nextSsquares);
    } else if (i == num) {
      movename = null;
      num = null;
      classtype = null;
      gomove = [];
      for (let j = 12; j < 109; j++) {
        if (document.getElementById(j).textContent == "□") {
          document.getElementById(j).textContent = "";
          document.getElementById(j).style.textShadow = null;
        }
        document.getElementById(j).style.textShadow = null;
        if (j % 11 == 9) {
          j += 2;
        }
      }
      if (playturn == "player1") {
        playturn = "player2";
      } else {
        playturn = "player1";
      }
    }
  }
  return (
    <div>
      <div className="status"></div>
      {
        (function () {
          const list = [];

          list.push(<h1 id="-1" >turn:player1</h1>);
          list.push(<h2>player1</h2>);
          for (let i = 0; i < 121; i++) {
            if (i > 0 && i < 120 && i % 11 >= 1 && i % 11 <= 9) {
              list.push(<Ssquare id={i} value={Ssquares[i]} onSsquareClick={() => handleClick(i)} />);
            }
            { i % 11 == 10 && list.push(<br />) }
          }
          list.push(<h2>player2</h2>);
          return list;
        }())
      }
    </div>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  var [currentMove, setCurrentMove] = useState(0);

  const xIsNext = null
  const currentSsquares = history[currentMove];
  function handlePlay(nextSsquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSsquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} Ssquares={currentSsquares} onPlay={handlePlay} />
      </div>
    </div>
  );
}