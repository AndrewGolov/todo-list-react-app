import { Button } from '../../components';
import { ImPlus, ImSearch, ImSortAlphaAsc, ImListNumbered } from 'react-icons/im';

export const RenderEditBtnBlock = ({
	disabled,
	onAddClick,
	dataBase,
	onSearchClick,
	onSortHandleClick,
	isSorted,
	onClearAllTodos,
}) => (
	<div className="edit-buttons-container">
		{dataBase.length > 1 ? (
			<>
				<Button text={<ImPlus />} disabled={disabled} onClick={onAddClick} />
				<Button text={<ImSearch />} onClick={onSearchClick} />
				<Button text={isSorted ? <ImSortAlphaAsc /> : <ImListNumbered />} onClick={onSortHandleClick} />
				<Button text="Clear All" onClick={onClearAllTodos} />
			</>
		) : (
			<>
				<Button text={<ImPlus />} disabled={disabled} onClick={onAddClick} />
			</>
		)}
	</div>
);
