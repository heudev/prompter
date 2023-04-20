import { useState, useEffect, useRef } from 'react';

export default function AutoScroll({ initialScrollTime = 50, initialWidth = '250px', initialHeight = '200px' }) {
    const [scrollTop, setScrollTop] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [scrollTime, setScrollTime] = useState(initialScrollTime);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [newWidth, setNewWidth] = useState(width);
    const [newHeight, setNewHeight] = useState(height);
    const scrollRef = useRef(null);
    const applyButtonRef = useRef(null);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setScrollTop((prevScrollTop) => {
                    const scrollHeight = scrollRef.current.scrollHeight;
                    const clientHeight = scrollRef.current.clientHeight;
                    const maxScrollTop = scrollHeight - clientHeight;
                    const newScrollTop = prevScrollTop - 1;

                    if (newScrollTop > maxScrollTop) {
                        clearInterval(interval);
                    }

                    return newScrollTop;
                });
            }, scrollTime);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning, scrollTime]);

    const handleToggle = () => {
        setIsRunning(!isRunning);
    };

    const handleToTop = () => {
        setScrollTop(0);
        scrollRef.current.scrollTop = 0;
    };

    const handleScrollTimeChange = (e) => {
        const newScrollTime = parseInt(e.target.value);

        if (!isNaN(newScrollTime)) {
            setScrollTime(Math.max(1, Math.min(100, newScrollTime)));
        }
    };

    const handleWidthChange = (e) => {
        setNewWidth(e.target.value);
    };

    const handleHeightChange = (e) => {
        setNewHeight(e.target.value);
    };

    const handleApplyButtonClick = () => {
        setWidth(newWidth);
        setHeight(newHeight);
        scrollRef.current.style.width = newWidth;
        scrollRef.current.style.height = newHeight;
        scrollRef.current.scrollTop = 0;
        applyButtonRef.current.blur();
    };

    const handleResetButtonClick = () => {
        setNewWidth(width);
        setNewHeight(height);
        scrollRef.current.style.width = width;
        scrollRef.current.style.height = height;
        applyButtonRef.current.blur();
    };

    const [text, setText] = useState("");

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    return (
        <div>
            <div className="mx-auto m-3 border border-dark rounded" style={{ width: width, height: height, position: "relative", fontFamily: "Helvetica Neue" }}>
                <div ref={scrollRef} style={{ height: "100%", width: "100%", overflowY: "scroll", padding: "5px" }} onScroll={(e) => { setScrollTop(e.target.scrollTop); }}>
                    <p style={{ marginTop: `${scrollTop}px`, whiteSpace: "pre-wrap" }}>{text}</p>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                <button className="btn btn-sm bg-primary m-1 text-white" onClick={handleToggle}>{isRunning ? "Stop" : "Start"} </button>
                <button className="btn btn-sm bg-danger m-1 text-white" onClick={handleToTop}>Başa Dön</button>
                <div>
                    <label htmlFor="scroll-time">Hız:</label>
                    <input type="number" id="scroll-time" name="scroll-time" min="1" max="100" value={scrollTime} onChange={handleScrollTimeChange} />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginLeft: "10px" }}>
                <div
                    style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <label htmlFor="width-input">Genişlik:</label>
                    <input type="text" id="width-input" name="width-input" value={newWidth} onChange={handleWidthChange} style={{ marginLeft: "5px", marginRight: "5px" }} />
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <label htmlFor="height-input">Yükseklik:</label>
                    <input type="text" id="height-input" name="height-input" value={newHeight} onChange={handleHeightChange} style={{ marginLeft: "5px", marginRight: "5px" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button ref={applyButtonRef} className="btn btn-sm bg-success m-1 text-white" onClick={handleApplyButtonClick}>Apply</button>
                    <button className="btn btn-sm bg-secondary m-1 text-white" onClick={handleResetButtonClick}>Reset</button>
                </div>
            </div>
            <div className="mx-auto text-center">
                <textarea value={text} onChange={handleTextChange} style={{ width: "20%", height: "300px", marginTop: "20px" }} />
            </div>
        </div>
    );

}
