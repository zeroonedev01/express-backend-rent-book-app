exports.ok = (val, rs) => {
    const data = {
        status: 200,
        values: val
    }
    rs.json(data)
    rs.end();
}