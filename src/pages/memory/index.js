import { GetListMemorize } from "@/services/VerbsService";
import { useEffect, useState } from "react";


const index = () => {
  const [listVerbs, setListVerbs] = useState([]);
  const [isStarted, setIsStarted] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [posicao, setPosicao] = useState(0)
  const [sectionNumber, setSectionNumber] = useState(1)
  const [usuario, setUsuario] = useState('')

  const handleStart = async (usuario) => {
    localStorage.setItem('isStarted', true)
    localStorage.setItem('usuario', usuario)

    const verbsList = shuffleArray(await GetListMemorize(sectionNumber));
    setListVerbs(verbsList);
    handleView()
  }

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const handleView = () => {
    const isStarted = localStorage.getItem('isStarted')
    const usuario = localStorage.getItem('usuario')

    // parse para boolean
    isStarted === 'true' ? setIsStarted(true) : setIsStarted(false)
    setUsuario(usuario)
  }

  const handleNext = () => {
    const posicao = parseInt(localStorage.getItem('posicao'))
    const proximaPosicao = posicao + 1

    localStorage.setItem('posicao', proximaPosicao)
    setPosicao(proximaPosicao)
    setShowAnswer(false)
    setShowButtons(false)
  }

  useEffect(() => {
    localStorage.setItem('isStarted', false)
    localStorage.setItem('posicao', 0)
    setPosicao(0)
    handleView()
  }, [])

  useEffect(() => {
    handleView()
  }, [isStarted])

  useEffect(() => {
    handleView()
  }, [posicao])

  return (
    <>

      <div className="row mb-2">
        <div className="col">
          <div className="bg-danger py-2 text-white px-2 text-center">
            <h2>Let's memorize!</h2>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-12 col-md-3">
          <div className="form-group">
            <label htmlFor="usuario">Section</label>
            <input type="number" name="sectionNumber" className="form-control" defaultValue={1} onChange={e => setSectionNumber(e.target.value)} />
          </div>
        </div>
      </div>

      {!isStarted && (
        <div className="row mb-2">
          <div className="col-12 col-md-2">
            <div className="card">
              <div className="card-header">
                <h5>Moiza</h5>
              </div>
              <div className="card-body pt-3">
                <img src="moiza.png" alt="" />
              </div>
              <div className="card-footer text-center py-2">
                <span className="btn btn-primary" onClick={() => handleStart('moiza')}>
                  <i className="fas fa-head-side-brain me-2"></i>
                  Start
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-2">
            <div className="card">
              <div className="card-header">
                <h5>Gério</h5>
              </div>
              <div className="card-body pt-3">
                <img src="gerio.png" alt="" />
              </div>
              <div className="card-footer text-center py-2">
                <span className="btn btn-primary" onClick={() => handleStart('gerio')}>
                  <i className="fas fa-head-side-brain me-2"></i>
                  Start
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isStarted && (
        <>
          <div className="row">
            <div className="col">
              <h3>Lest's Trainning</h3>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <div className="card">
                <div className="card-header text-center">
                  <h5>{usuario.toUpperCase()}</h5>
                  <h6>Section: {sectionNumber}</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col text-center">
                      <div className="mb-3">
                        <div className="px-3">
                          <h2>{listVerbs[posicao]?.Verb}</h2>
                        </div>
                      </div>
                      <div>
                        {showAnswer && (
                          <div className="px-3">
                            <h2 className="text-primary">{listVerbs[posicao]?.Translate}</h2>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-center py-2">
                  {
                    !showAnswer && (
                      <span className="btn btn-primary me-2" accessKey="s" onClick={e => {
                        setShowAnswer(true)
                        setShowButtons(true)
                      }}>
                        <i className="fas fa-eye me-2"></i>
                        Show Answer
                      </span>
                    )
                  }

                  {
                    showButtons && (
                      <>
                        <span className="btn btn-danger me-2" accessKey="w" onClick={handleNext}>
                          <i className="fas fa-poo me-2"></i>
                          Wrong
                        </span>
                        <span className="btn btn-success" accessKey="c" onClick={handleNext}>
                          <i className="fas fa-chess-king me-2"></i>
                          Correct
                        </span>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default index;
